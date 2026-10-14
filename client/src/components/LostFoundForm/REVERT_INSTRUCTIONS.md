# Revert Instructions for Report Lost & Found Forms

All original components from before this UX revamp are safely backed up in:
`client/src/components/LostFoundForm/backup_original/`

### To Revert:
Simply copy all files from `backup_original/` back into `client/src/components/LostFoundForm/`:

**In PowerShell:**
```powershell
Copy-Item "client\src\components\LostFoundForm\backup_original\*" -Destination "client\src\components\LostFoundForm\" -Recurse -Force
```

**Or in Git:**
```bash
git checkout -- client/src/components/LostFoundForm/
```

### Revert Report Details Modal:
The original Report Details Modal is backed up at:
`client/src/components/dashboard/myReports/ReportDetailsModal.original.jsx`

To restore:
```powershell
Copy-Item "client\src\components\dashboard\myReports\ReportDetailsModal.original.jsx" -Destination "client\src\components\dashboard\myReports\ReportDetailsModal.jsx" -Force
```
