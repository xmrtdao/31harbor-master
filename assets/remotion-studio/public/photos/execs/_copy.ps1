$src = "C:\Users\PureTrek\Desktop\DevGruGold\XMRT Executives Personas Pics"
$dst = "C:\Users\PureTrek\Desktop\DevGruGold\Elze-Property-Hamptons\remotion-studio\public\photos\execs"
$files = @("bella-cmo","klous-coo","saudi-farsi-cfo","sharma-cto","yakamoto-cpo")
foreach ($f in $files) {
    $s = Join-Path $src ($f + ".png")
    $d = Join-Path $dst ($f + ".png")
    Copy-Item $s $d -Force
    Write-Host "copied $f"
}
Get-ChildItem $dst | Select-Object Name,Length
