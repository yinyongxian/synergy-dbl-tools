Add-Type -AssemblyName System.Windows.Forms

try {
    [System.Windows.Forms.SendKeys]::SendWait("^v")

    # delay 3 seconds
    Start-Sleep -Seconds 6

    [System.Windows.Forms.SendKeys]::SendWait("%{F4}")

    [System.Windows.Forms.SendKeys]::SendWait("%{F4}")

    # [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
} catch [System.Exception] {

    Write-Error "An error occurred while simulating keyboard inputs: $_"
}
