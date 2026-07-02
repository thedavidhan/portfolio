# ============================================================
# SYNC-ASSETS - scans the assets folders and rebuilds
# assets/manifest.js so the site picks up whatever you dropped in.
# Run via SYNC-ASSETS.bat (double-click). Safe to run any time.
# ============================================================

$ErrorActionPreference = "Stop"
$root   = Split-Path -Parent $MyInvocation.MyCommand.Path
$assets = Join-Path $root "assets"

$imgExt = @(".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif")
$vidExt = @(".mp4", ".webm")
$badExt = @(".mov", ".heic", ".heif", ".tif", ".tiff", ".bmp")

$warnings = New-Object System.Collections.Generic.List[string]

function Get-MediaFiles($folder, $exts) {
    $dir = Join-Path $assets $folder
    if (-not (Test-Path $dir)) { return @() }
    $files = @(Get-ChildItem -Path $dir -File | Sort-Object { [regex]::Replace($_.Name.ToLower(), '\d+', { $args[0].Value.PadLeft(10, '0') }) })
    $out = @()
    foreach ($f in $files) {
        $ext = $f.Extension.ToLower()
        if ($exts -contains $ext) {
            $out += "assets/$folder/$($f.Name)"
            $mb = [math]::Round($f.Length / 1MB, 1)
            if ($imgExt -contains $ext -and $f.Length -gt 600KB) {
                $warnings.Add("LARGE IMAGE  $folder/$($f.Name)  ($mb MB) - aim for <0.5 MB (squoosh.app)")
            }
            if ($vidExt -contains $ext -and $f.Length -gt 12MB) {
                $warnings.Add("LARGE VIDEO  $folder/$($f.Name)  ($mb MB) - aim for <10 MB (HandBrake, Web preset)")
            }
        }
        elseif ($badExt -contains $ext) {
            $warnings.Add("SKIPPED      $folder/$($f.Name) - browsers can't show $ext. Convert to jpg/mp4.")
        }
    }
    return $out
}

function ToJsArray($items) {
    if ($null -eq $items -or $items.Count -eq 0) { return "[]" }
    $q = @($items | ForEach-Object { '"' + ($_ -replace '\\', '/') + '"' })
    return "[" + ($q -join ", ") + "]"
}

Write-Host ""
Write-Host "// SYNC-ASSETS -- scanning..." -ForegroundColor DarkYellow

$cars      = Get-MediaFiles "cars"      $imgExt
$vending   = Get-MediaFiles "vending"   $imgExt
$climbing  = Get-MediaFiles "climbing"  $imgExt
$buildings = Get-MediaFiles "buildings" $vidExt
$lighting  = Get-MediaFiles "lighting"  $vidExt
$posters   = Get-MediaFiles "posters"   $imgExt
$broco     = Get-MediaFiles "bro-and-co" ($imgExt + $vidExt)
$bucGal    = Get-MediaFiles "buc/gallery" ($imgExt + $vidExt)
$bucVols   = Get-MediaFiles "buc/volumes" $imgExt
$mcfe      = Get-MediaFiles "mcfe"       $imgExt
$hero      = Get-MediaFiles "hero"       $imgExt
$campusVid = Get-MediaFiles "campus-videos" $vidExt
$carReel   = Get-MediaFiles "car-reel" ($vidExt + $imgExt)
$episodes  = Get-MediaFiles "podcast-episodes" $imgExt
$books     = Get-MediaFiles "books" $imgExt

# travel/<place>/ subfolders
$travelParts = @()
$travelDir = Join-Path $assets "travel"
if (Test-Path $travelDir) {
    foreach ($d in (Get-ChildItem -Path $travelDir -Directory | Sort-Object Name)) {
        $files = Get-MediaFiles "travel/$($d.Name)" $imgExt
        if ($files.Count -gt 0) {
            $travelParts += ('"' + $d.Name.ToLower() + '": ' + (ToJsArray $files))
        }
    }
}
$travelJs = "{ " + ($travelParts -join ", ") + " }"

# clubs/<club>/ subfolders
$clubsParts = @()
$clubsDir = Join-Path $assets "clubs"
if (Test-Path $clubsDir) {
    foreach ($d in (Get-ChildItem -Path $clubsDir -Directory | Sort-Object Name)) {
        $files = Get-MediaFiles "clubs/$($d.Name)" ($imgExt + $vidExt)
        if ($files.Count -gt 0) {
            $clubsParts += ('"' + $d.Name.ToLower() + '": ' + (ToJsArray $files))
        }
    }
}
$clubsJs = "{ " + ($clubsParts -join ", ") + " }"

# nature/<place>/ subfolders (photos AND videos; folder name links to the map pin)
$allExt = $imgExt + $vidExt
$natureParts = @()
$natureDir = Join-Path $assets "nature"
if (Test-Path $natureDir) {
    foreach ($d in (Get-ChildItem -Path $natureDir -Directory | Sort-Object Name)) {
        $files = Get-MediaFiles "nature/$($d.Name)" $allExt
        if ($files.Count -gt 0) {
            $natureParts += ('"' + $d.Name.ToLower() + '": ' + (ToJsArray $files))
        }
    }
}
$natureJs = "{ " + ($natureParts -join ", ") + " }"

$js = "window.MANIFEST = {`n" +
      '  "cars": '      + (ToJsArray $cars)      + ",`n" +
      '  "vending": '   + (ToJsArray $vending)   + ",`n" +
      '  "climbing": '  + (ToJsArray $climbing)  + ",`n" +
      '  "buildings": ' + (ToJsArray $buildings) + ",`n" +
      '  "lighting": '  + (ToJsArray $lighting)  + ",`n" +
      '  "posters": '   + (ToJsArray $posters)   + ",`n" +
      '  "bro-and-co": ' + (ToJsArray $broco)    + ",`n" +
      '  "buc": '        + (ToJsArray $bucGal)   + ",`n" +
      '  "buc-volumes": ' + (ToJsArray $bucVols) + ",`n" +
      '  "mcfe": '       + (ToJsArray $mcfe)     + ",`n" +
      '  "hero": '       + (ToJsArray $hero)     + ",`n" +
      '  "clubs": '      + $clubsJs + ",`n" +
      '  "campus-videos": ' + (ToJsArray $campusVid) + ",`n" +
      '  "car-reel": '  + (ToJsArray $carReel)   + ",`n" +
      '  "podcast-episodes": ' + (ToJsArray $episodes) + ",`n" +
      '  "books": '     + (ToJsArray $books)     + ",`n" +
      '  "travel": '    + $travelJs + ",`n" +
      '  "nature": '    + $natureJs + "`n" +
      "};`n"

$outPath = Join-Path $assets "manifest.js"
[System.IO.File]::WriteAllText($outPath, $js, (New-Object System.Text.UTF8Encoding($false)))

Write-Host ""
Write-Host ("  cars       {0,3} files" -f $cars.Count)
Write-Host ("  vending    {0,3} files" -f $vending.Count)
Write-Host ("  climbing   {0,3} files" -f $climbing.Count)
Write-Host ("  buildings  {0,3} files" -f $buildings.Count)
Write-Host ("  lighting   {0,3} files" -f $lighting.Count)
Write-Host ("  posters    {0,3} files" -f $posters.Count)
Write-Host ("  bro & co   {0,3} files" -f $broco.Count)
Write-Host ("  buc gallery {0,2} files" -f $bucGal.Count)
Write-Host ("  buc volumes {0,2} files" -f $bucVols.Count)
Write-Host ("  mcfe       {0,3} files" -f $mcfe.Count)
Write-Host ("  hero       {0,3} files" -f $hero.Count)
Write-Host ("  clubs      {0,3} clubs" -f $clubsParts.Count)
Write-Host ("  campus vid {0,3} files" -f $campusVid.Count)
Write-Host ("  car reel   {0,3} files" -f $carReel.Count)
Write-Host ("  episodes   {0,3} files" -f $episodes.Count)
Write-Host ("  books      {0,3} files" -f $books.Count)
Write-Host ("  travel     {0,3} places" -f $travelParts.Count)
Write-Host ("  nature     {0,3} places" -f $natureParts.Count)
Write-Host ""

if ($warnings.Count -gt 0) {
    Write-Host "// HEADS UP" -ForegroundColor DarkYellow
    foreach ($w in $warnings) { Write-Host "  $w" -ForegroundColor Yellow }
    Write-Host ""
}

Write-Host "// DONE -- refresh the site in your browser (Ctrl+Shift+R)." -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to close"
