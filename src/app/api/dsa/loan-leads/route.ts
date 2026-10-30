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
    const estimatedCommission = parseFloat(loanAmount) * 0.006;

    const loanLead = await prisma.loanLead.create({
      data: {
        applicantName,
        phone,
        email: email || null,
        monthlyIncome: parseFloat(monthlyIncome),
        loanAmount: parseFloat(loanAmount),
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

    return NextResponse.json({
      success: true,
      message: 'Your home loan pre-qualification has been registered! Our dedicated banking concierge from ' + preferredBank + ' will connect within 2 hours.',
      loanLeadId: loanLead.id,
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

    const loanLeads = await prisma.loanLead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const totalPipelineValue = loanLeads.reduce((acc, curr) => acc + curr.loanAmount, 0);
    const totalPotentialCommission = loanLeads.reduce((acc, curr) => acc + (curr.commissionEarned || 0), 0);

    return NextResponse.json({
      loanLeads,
      metrics: {
        totalLeads: loanLeads.length,
        totalPipelineValue,
        totalPotentialCommission,
      },
    });
  } catch (error: any) {
    console.error('Fetch loan leads error:', error);
    return NextResponse.json({ error: 'Failed to fetch loan leads' }, { status: 500 });
  }
}
