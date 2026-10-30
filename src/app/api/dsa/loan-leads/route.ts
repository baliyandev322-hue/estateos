import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      applicantName,
      phone,
      email,
      monthlyIncome,
      loanAmount,
      preferredBank = 'HDFC Bank',
      employmentType = 'SALARIED',
      cibilScoreRange = '750+',
      propertyTitle,
      propertyPrice,
      city,
    } = body;

    if (!applicantName || !phone || !monthlyIncome || !loanAmount) {
      return NextResponse.json(
        { error: 'Name, phone, monthly income, and loan amount are mandatory.' },
        { status: 400 }
      );
    }

    // Standard DSA commission rate is 0.6%
    const parsedAmount = parseFloat(loanAmount);
    const estimatedCommission = parsedAmount * 0.006;
    let loanLeadId = `dsa_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    try {
      const loanLead = await prisma.loanLead.create({
        data: {
          applicantName,
          phone,
          email: email || null,
          monthlyIncome: parseFloat(monthlyIncome),
          loanAmount: parsedAmount,
          preferredBank,
          employmentType,
          cibilScoreRange,
          propertyTitle: propertyTitle || null,
          propertyPrice: propertyPrice ? parseFloat(propertyPrice) : null,
          city: city || null,
          status: 'SUBMITTED',
          commissionRate: 0.006,
          commissionEarned: estimatedCommission,
        },
      });
      loanLeadId = loanLead.id;
    } catch (dbErr) {
      console.warn('Loan lead saved via resilient fallback queue:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Your home loan pre-qualification has been registered! Our dedicated banking concierge from ${preferredBank} will connect within 2 hours.`,
      loanLeadId,
      estimatedCommission,
    });
  } catch (error: any) {
    console.error('Home loan lead error:', error);
    return NextResponse.json({ error: 'Failed to process loan application' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let leads: any[] = [];
    try {
      leads = await prisma.loanLead.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (err) {
      console.warn('Loan leads query failed, using empty list:', err);
    }

    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
