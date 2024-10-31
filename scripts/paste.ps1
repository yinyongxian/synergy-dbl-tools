Add-Type -AssemblyName System.Windows.Forms

try {
    Start-Sleep -Seconds 1
    [System.Windows.Forms.SendKeys]::SendWait("^v")
    
    Start-Sleep -Seconds 1
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")

    Start-Sleep -Seconds 5

    [System.Windows.Forms.SendKeys]::SendWait("%{F4}")

    # [System.Windows.Forms.SendKeys]::SendWait("%{F4}")

    # [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
} catch [System.Exception] {

    Write-Error "An error occurred while simulating keyboard inputs: $_"
}
