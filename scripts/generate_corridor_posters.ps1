Add-Type -AssemblyName System.Drawing

$outDir = Join-Path (Get-Location) "public\images\corridors"

$posters = @(
  @{
    file = "modipuram-nh58-meerut.jpg"
    city = "MEERUT • NH-58 & RAPIDX CORRIDOR"
    title = "Modipuram & NH-58 Bypass"
    subtitle = "Approved Gated Residential Plots & Duplex Villas"
    specs1 = "100 – 250 Sq.Yd Plots"
    specs2 = "MDA / 143 Clear Registry"
    specs3 = "SBI / HDFC Loan Ready"
    rate = "Starting ~₹32 Lakh"
    highlight = "5 Min from Delhi-Meerut RapidX Metro & Subharti"
  },
  @{
    file = "ansal-vedvyaspuri-meerut.jpg"
    city = "MEERUT • DELHI EXPRESSWAY BELT"
    title = "Ansal Sushant City & Vedvyaspuri"
    subtitle = "Established Township Plots & Builder Floors"
    specs1 = "120 – 300 Sq.Yd Units"
    specs2 = "MDA Approved Sector"
    specs3 = "Immediate Mutation"
    rate = "Starting ~₹38 Lakh"
    highlight = "Direct Access to Baghpat Bypass & Delhi Expressway"
  },
  @{
    file = "ganga-nagar-meerut.jpg"
    city = "MEERUT • MAWANA ROAD ENCLAVE"
    title = "Ganga Nagar & Mawana Road"
    subtitle = "Luxury Independent Villas & Residential Plots"
    specs1 = "Plots & 3BHK Kothis"
    specs2 = "Established Civic Colony"
    specs3 = "80% Bank Finance Ready"
    rate = "Starting ~₹45 Lakh"
    highlight = "Prime Family Residential Zone Near IIMT & Markets"
  },
  @{
    file = "a2z-nh58-muzaffarnagar.jpg"
    city = "MUZAFFARNAGAR • NH-58 HIGHWAY"
    title = "A2Z Green Estate & Bypass Belt"
    subtitle = "Gated Township Residential Plots & Luxury Kothis"
    specs1 = "100 – 250 Sq.Yd Plots"
    specs2 = "MZNDA / 143 Approved"
    specs3 = "24x7 Gated Security"
    rate = "Starting ~₹36 Lakh"
    highlight = "Direct Connectivity to Delhi-Haridwar NH-58 Bypass"
  },
  @{
    file = "dwarka-city-muzaffarnagar.jpg"
    city = "MUZAFFARNAGAR • ROORKEE ROAD"
    title = "Dwarka City & Roorkee Road"
    subtitle = "Approved Gated Residential Colonies & Plots"
    specs1 = "90 – 200 Sq.Yd Plots"
    specs2 = "30ft Interlocking Roads"
    specs3 = "Instant Bank Loan"
    rate = "Starting ~₹28 Lakh"
    highlight = "Rapidly Appreciating Residential Belt Near Colleges"
  },
  @{
    file = "vasundhara-jansath-muzaffarnagar.jpg"
    city = "MUZAFFARNAGAR • JANSATH ROAD"
    title = "Vasundhara Residency & Jansath Rd"
    subtitle = "Peaceful Gated Plots & Independent Homes"
    specs1 = "100 – 180 Sq.Yd Plots"
    specs2 = "143 Approved Colony"
    specs3 = "Dakhil Kharij Ready"
    rate = "Starting ~₹24 Lakh"
    highlight = "Direct Ring Road Connectivity & Family Environment"
  }
)

foreach ($p in $posters) {
  $width = 1200
  $height = 800
  $bmp = New-Object System.Drawing.Bitmap $width, $height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  # Background Luxury Forest Gradient
  $rectFull = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
  $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rectFull,
    [System.Drawing.Color]::FromArgb(255, 8, 28, 18),
    [System.Drawing.Color]::FromArgb(255, 16, 48, 32),
    45
  )
  $g.FillRectangle($bgBrush, $rectFull)

  # Subtle Architectural Blueprint Grid Lines
  $gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(22, 212, 175, 55), 1)
  for ($x = 0; $x -lt $width; $x += 60) {
    $g.DrawLine($gridPen, $x, 0, $x, $height)
  }
  for ($y = 0; $y -lt $height; $y += 60) {
    $g.DrawLine($gridPen, 0, $y, $width, $y)
  }

  # Outer Luxury Gold Border Frame
  $goldPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(200, 212, 175, 55), 4)
  $g.DrawRectangle($goldPen, 24, 24, $width - 48, $height - 48)
  $thinGoldPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 212, 175, 55), 1.5)
  $g.DrawRectangle($thinGoldPen, 36, 36, $width - 72, $height - 72)

  # Brushes & Fonts
  $brushGold = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 234, 179, 8))
  $brushWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  $brushSoftWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(215, 226, 232, 240))
  $brushEmeraldBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 6, 78, 59))
  $brushDarkCard = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 10, 22, 16))
  $brushBlack = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 10, 25, 18))

  $fontBrand = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Bold)
  $fontCityPill = New-Object System.Drawing.Font("Arial", 15, [System.Drawing.FontStyle]::Bold)
  $fontTitle = New-Object System.Drawing.Font("Georgia", 36, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Arial", 20, [System.Drawing.FontStyle]::Regular)
  $fontCardTitle = New-Object System.Drawing.Font("Arial", 17, [System.Drawing.FontStyle]::Bold)
  $fontRate = New-Object System.Drawing.Font("Georgia", 28, [System.Drawing.FontStyle]::Bold)
  $fontFooter = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Bold)

  # Top Bar: EstateOS Verified Market Showcase
  $g.FillRectangle($brushGold, 68, 66, 360, 42)
  $g.DrawString("ESTATEOS VERIFIED CORRIDOR", $fontBrand, $brushBlack, 82, 74)

  # Top Right Badge: Site Photos On Request
  $g.DrawString("★ MARKET RATE & INVENTORY DESK", $fontBrand, $brushGold, 730, 74)

  # City Pill
  $g.FillRectangle($brushEmeraldBg, 68, 155, 560, 42)
  $g.DrawRectangle($thinGoldPen, 68, 155, 560, 42)
  $g.DrawString("LOCATION: " + $p.city, $fontCityPill, $brushGold, 84, 164)

  # Main Colony Title
  $g.DrawString($p.title, $fontTitle, $brushWhite, 68, 228)

  # Subtitle
  $g.DrawString($p.subtitle, $fontSub, $brushSoftWhite, 68, 295)

  # 3 Spec Cards Row
  $cardW = 336
  $cardH = 125
  $cardY = 380

  # Card 1
  $g.FillRectangle($brushDarkCard, 68, $cardY, $cardW, $cardH)
  $g.DrawRectangle($thinGoldPen, 68, $cardY, $cardW, $cardH)
  $g.DrawString("AVAILABLE SIZES", $fontFooter, $brushGold, 88, $cardY + 25)
  $g.DrawString($p.specs1, $fontCardTitle, $brushWhite, 88, $cardY + 62)

  # Card 2
  $g.FillRectangle($brushDarkCard, 68 + $cardW + 28, $cardY, $cardW, $cardH)
  $g.DrawRectangle($thinGoldPen, 68 + $cardW + 28, $cardY, $cardW, $cardH)
  $g.DrawString("LEGAL STATUS", $fontFooter, $brushGold, 88 + $cardW + 28, $cardY + 25)
  $g.DrawString($p.specs2, $fontCardTitle, $brushWhite, 88 + $cardW + 28, $cardY + 62)

  # Card 3
  $g.FillRectangle($brushDarkCard, 68 + ($cardW + 28) * 2, $cardY, $cardW, $cardH)
  $g.DrawRectangle($thinGoldPen, 68 + ($cardW + 28) * 2, $cardY, $cardW, $cardH)
  $g.DrawString("BANK FINANCING", $fontFooter, $brushGold, 88 + ($cardW + 28) * 2, $cardY + 25)
  $g.DrawString($p.specs3, $fontCardTitle, $brushWhite, 88 + ($cardW + 28) * 2, $cardY + 62)

  # Price & Connectivity Strip
  $g.FillRectangle($brushDarkCard, 68, 545, 1064, 115)
  $g.DrawRectangle($goldPen, 68, 545, 1064, 115)
  $g.DrawString($p.rate, $fontRate, $brushGold, 94, 578)
  $g.DrawString("✔ " + $p.highlight, $fontCardTitle, $brushWhite, 480, 570)
  $g.DrawString("✔ Request Original Plot Layout, Video & Direct Site Visit via EstateOS", $fontFooter, $brushSoftWhite, 480, 610)

  # Footer Strip
  $g.DrawString("www.estateospro.in  •  Direct Verification & Home Loan Desk: +91 93685 93249", $fontFooter, $brushGold, 68, 706)

  # Save JPEG
  $destFile = Join-Path $outDir $p.file
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
  $bmp.Save($destFile, $codec, $encoderParams)

  $g.Dispose()
  $bmp.Dispose()
  Write-Output "Generated poster: $($p.file)"
}
