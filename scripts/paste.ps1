Add-Type -AssemblyName System.Windows.Forms

try {
    Start-Sleep -Seconds 3

    # Simulate Alt+F4 to close the window
    [System.Windows.Forms.SendKeys]::SendWait("%{F4}")

    # [System.Windows.Forms.SendKeys]::SendWait("%{F4}")

    # [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
} catch [System.Exception] {

    Write-Error "An error occurred while simulating keyboard inputs: $_"
}
