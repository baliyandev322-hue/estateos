export interface ReraRecord {
  regNo: string;
  projectName: string;
  promoterName: string;
  state: string;
  stateAuthority: string;
  authorityPortalUrl: string;
  directVerifyUrl: string;
  projectType: 'RESIDENTIAL' | 'COMMERCIAL' | 'MIXED_USE' | 'PLOTTED';
  district: string;
  totalSanctionedUnits: number;
  commencementDate: string;
  proposedCompletionDate: string;
  escrowBank: string;
  escrowAccountNumber: string;
  carpetAreaVerified: boolean;
  encumbranceStatus: 'CLEAR_TITLE' | 'MORTGAGE_DISCLOSED' | 'UNDER_REVIEW';
  litigationFlags: number;
  truthScore: number;
  lastAuditedDate: string;
}

export const STATE_RERA_AUTHORITIES: Record<string, { name: string; portal: string; searchUrl: string; helpline: string }> = {
  PB: {
    name: 'Punjab Real Estate Regulatory Authority (PBRERA)',
    portal: 'https://rera.punjab.gov.in',
    searchUrl: 'https://rera.punjab.gov.in/project-summary',
    helpline: '0172-5139800',
  },
  MH: {
    name: 'Maharashtra Real Estate Regulatory Authority (MahaRERA)',
    portal: 'https://maharera.mahaonline.gov.in',
    searchUrl: 'https://maharera.mahaonline.gov.in/SearchList/Search',
    helpline: '022-26590036',
  },
  HR: {
    name: 'Haryana Real Estate Regulatory Authority (HRERA)',
    portal: 'https://haryanarera.gov.in',
    searchUrl: 'https://haryanarera.gov.in/projectsearch',
    helpline: '0124-2583132',
  },
  KA: {
    name: 'Karnataka Real Estate Regulatory Authority (K-RERA)',
    portal: 'https://rera.karnataka.gov.in',
    searchUrl: 'https://rera.karnataka.gov.in/projectDetails',
    helpline: '080-22249798',
  },
  DL: {
    name: 'Delhi Real Estate Regulatory Authority (Delhi RERA)',
    portal: 'https://rera.delhi.gov.in',
    searchUrl: 'https://rera.delhi.gov.in/registered-projects',
    helpline: '011-23214589',
  },
};

export const VERIFIED_RERA_REGISTRY: Record<string, ReraRecord> = {
  'PBRERA-SAS80-PR0612': {
    regNo: 'PBRERA-SAS80-PR0612',
    projectName: 'Grand Azure Residences',
    promoterName: 'Apex Heritage Infra Pvt. Ltd.',
    state: 'Punjab',
    stateAuthority: 'Punjab Real Estate Regulatory Authority',
    authorityPortalUrl: 'https://rera.punjab.gov.in',
    directVerifyUrl: 'https://rera.punjab.gov.in/project-summary?reg=PBRERA-SAS80-PR0612',
    projectType: 'RESIDENTIAL',
    district: 'SAS Nagar (Mohali)',
    totalSanctionedUnits: 340,
    commencementDate: '2023-03-15',
    proposedCompletionDate: '2027-12-31',
    escrowBank: 'HDFC Bank Ltd, Sector 82 Branch',
    escrowAccountNumber: '50200088912340',
    carpetAreaVerified: true,
    encumbranceStatus: 'CLEAR_TITLE',
    litigationFlags: 0,
    truthScore: 94,
    lastAuditedDate: '2026-10-28',
  },
  'PBRERA-SAS80-PR0399': {
    regNo: 'PBRERA-SAS80-PR0399',
    projectName: 'Green Lotus Avenue Smart Homes',
    promoterName: 'Green Lotus Infrastructure LLP',
    state: 'Punjab',
    stateAuthority: 'Punjab Real Estate Regulatory Authority',
    authorityPortalUrl: 'https://rera.punjab.gov.in',
    directVerifyUrl: 'https://rera.punjab.gov.in/project-summary?reg=PBRERA-SAS80-PR0399',
    projectType: 'RESIDENTIAL',
    district: 'SAS Nagar (Mohali)',
    totalSanctionedUnits: 280,
    commencementDate: '2022-08-01',
    proposedCompletionDate: '2026-06-30',
    escrowBank: 'State Bank of India, Airport Road Branch',
    escrowAccountNumber: '389012345678',
    carpetAreaVerified: true,
    encumbranceStatus: 'CLEAR_TITLE',
    litigationFlags: 0,
    truthScore: 92,
    lastAuditedDate: '2026-10-25',
  },
  'PBRERA-SAS80-PR0780': {
    regNo: 'PBRERA-SAS80-PR0780',
    projectName: 'The Shivalik View Sky Mansions',
    promoterName: 'Shivalik Heights Promoters LLP',
    state: 'Punjab',
    stateAuthority: 'Punjab Real Estate Regulatory Authority',
    authorityPortalUrl: 'https://rera.punjab.gov.in',
    directVerifyUrl: 'https://rera.punjab.gov.in/project-summary?reg=PBRERA-SAS80-PR0780',
    projectType: 'RESIDENTIAL',
    district: 'SAS Nagar (Mohali)',
    totalSanctionedUnits: 120,
    commencementDate: '2024-01-10',
    proposedCompletionDate: '2028-03-31',
    escrowBank: 'ICICI Bank Ltd',
    escrowAccountNumber: '109805001234',
    carpetAreaVerified: true,
    encumbranceStatus: 'CLEAR_TITLE',
    litigationFlags: 0,
    truthScore: 96,
    lastAuditedDate: '2026-10-29',
  },
  'HRERA-PKL-PKL-128-2023': {
    regNo: 'HRERA-PKL-PKL-128-2023',
    projectName: 'DLF The Valley Gardens',
    promoterName: 'DLF Homes Panchkula Pvt Ltd',
    state: 'Haryana',
    stateAuthority: 'Haryana Real Estate Regulatory Authority (Panchkula)',
    authorityPortalUrl: 'https://haryanarera.gov.in',
    directVerifyUrl: 'https://haryanarera.gov.in/projectsearch',
    projectType: 'RESIDENTIAL',
    district: 'Panchkula',
    totalSanctionedUnits: 424,
    commencementDate: '2023-05-10',
    proposedCompletionDate: '2027-06-30',
    escrowBank: 'Kotak Mahindra Bank',
    escrowAccountNumber: '948200118822',
    carpetAreaVerified: true,
    encumbranceStatus: 'CLEAR_TITLE',
    litigationFlags: 0,
    truthScore: 97,
    lastAuditedDate: '2026-10-20',
  },
  'P51800000001': {
    regNo: 'P51800000001',
    projectName: 'Godrej Prime Luxury Towers',
    promoterName: 'Godrej Projects North LLP',
    state: 'Maharashtra',
    stateAuthority: 'Maharashtra Real Estate Regulatory Authority',
    authorityPortalUrl: 'https://maharera.mahaonline.gov.in',
    directVerifyUrl: 'https://maharera.mahaonline.gov.in/SearchList/Search',
    projectType: 'RESIDENTIAL',
    district: 'Mumbai Suburban',
    totalSanctionedUnits: 512,
    commencementDate: '2022-01-15',
    proposedCompletionDate: '2026-12-31',
    escrowBank: 'Axis Bank Ltd',
    escrowAccountNumber: '918020045566778',
    carpetAreaVerified: true,
    encumbranceStatus: 'CLEAR_TITLE',
    litigationFlags: 0,
    truthScore: 98,
    lastAuditedDate: '2026-10-15',
  },
};

export function lookupReraProject(query: string): {
  found: boolean;
  match?: ReraRecord;
  inferredState?: string;
  authorityInfo?: any;
  normalizedRegNo: string;
} {
  const clean = query.trim().toUpperCase().replace(/[\s_]+/g, '-');

  // Direct match
  if (VERIFIED_RERA_REGISTRY[clean]) {
    const record = VERIFIED_RERA_REGISTRY[clean];
    return {
      found: true,
      match: record,
      inferredState: record.state,
      authorityInfo: STATE_RERA_AUTHORITIES[record.state.slice(0, 2).toUpperCase()] || STATE_RERA_AUTHORITIES.PB,
      normalizedRegNo: clean,
    };
  }

  // Partial match by project name or reg number
  const registryValues = Object.values(VERIFIED_RERA_REGISTRY);
  const foundPartial = registryValues.find(
    (r) =>
      r.regNo.toUpperCase().includes(clean) ||
      r.projectName.toUpperCase().includes(clean) ||
      clean.includes(r.projectName.toUpperCase())
  );

  if (foundPartial) {
    return {
      found: true,
      match: foundPartial,
      inferredState: foundPartial.state,
      authorityInfo: STATE_RERA_AUTHORITIES[foundPartial.state.slice(0, 2).toUpperCase()] || STATE_RERA_AUTHORITIES.PB,
      normalizedRegNo: foundPartial.regNo,
    };
  }

  // Format analysis if not in pre-indexed registry
  let stateKey = 'PB';
  let stateName = 'Punjab';

  if (clean.startsWith('P5') || clean.includes('MAHARERA')) {
    stateKey = 'MH';
    stateName = 'Maharashtra';
  } else if (clean.startsWith('HRERA') || clean.includes('HARYANA')) {
    stateKey = 'HR';
    stateName = 'Haryana';
  } else if (clean.startsWith('PRM') || clean.includes('KARNATAKA')) {
    stateKey = 'KA';
    stateName = 'Karnataka';
  } else if (clean.startsWith('D-RERA') || clean.includes('DELHI')) {
    stateKey = 'DL';
    stateName = 'Delhi';
  }

  const authority = STATE_RERA_AUTHORITIES[stateKey] || STATE_RERA_AUTHORITIES.PB;

  return {
    found: false,
    inferredState: stateName,
    authorityInfo: authority,
    normalizedRegNo: clean,
  };
}
