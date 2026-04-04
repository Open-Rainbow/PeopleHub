# How to Push PeopleHub to GitHub

Your local repository is ready! Now follow these steps to push it to GitHub.

## Option 1: Using GitHub Web UI (Recommended)

### Step 1: Create Repository on GitHub

1. Go to https://github.com/orgs/Open-Rainbow/repositories
2. Click **"New"** button (top right)
3. Fill in the following:
   - **Repository name**: `PeopleHub`
   - **Description**: `Multi-tenant HRMS Platform - ASP.NET Core + Angular`
   - **Visibility**: Select based on your preference (Private or Public)
   - **Initialize this repository with**: Leave all unchecked (we have commits already)
4. Click **"Create repository"**

### Step 2: Add Remote and Push (Windows PowerShell)

Copy and run these commands in your terminal:

```powershell
cd "d:\Projects\Open Rainbow\PeopleHub"

# Add GitHub as remote (replace YOUR_ORG_NAME if needed)
git remote add origin https://github.com/Open-Rainbow/PeopleHub.git

# Rename branch to main if on master
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: You'll be prompted to authenticate. Choose one of these:
- GitHub personal access token (recommended for automation)
- GitHub username + personal access token
- SSH key (if configured)

---

## Option 2: Using SSH (If SSH Keys Configured)

```powershell
cd "d:\Projects\Open Rainbow\PeopleHub"

# Add remote via SSH
git remote add origin git@github.com:Open-Rainbow/PeopleHub.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Verify Push Was Successful

After pushing, verify by:

1. Visit: https://github.com/Open-Rainbow/PeopleHub
2. Check that all files are present
3. Verify commit history shows your initial commit

## What Gets Pushed

✅ **Pushed to GitHub:**
- All source code files
- Project structure (core/, PeopleHub.Server/, peoplehub.client/)
- Configuration files (.gitignore, README.md)
- Documentation (docs/ folder with ARCHITECTURE.md, guides)
- Solution file (PeopleHub.slnx)
- Project files (.csproj, .esproj)

❌ **NOT pushed** (ignored by .gitignore):
- node_modules/ (Angular dependencies)
- bin/ & obj/ (Build artifacts)
- .vs/ (Visual Studio cache)
- .env files (secrets)
- Generated files

## Clone from GitHub Later

Once pushed, you or team members can clone via:

```powershell
git clone https://github.com/Open-Rainbow/PeopleHub.git
cd PeopleHub
```

## Setup After Cloning

After cloning on a new machine:

```bash
# Install .NET dependencies
dotnet restore

# Install Angular dependencies
cd peoplehub.client
npm install
cd ..

# Setup database
cd PeopleHub.Server
dotnet ef database update
```

---

## GitHub URLs

- **Repository**: https://github.com/Open-Rainbow/PeopleHub
- **Organization**: https://github.com/orgs/Open-Rainbow/repositories

## Troubleshooting

### Authentication Failed
- Use GitHub Personal Access Token (not password)
- Generate token at: https://github.com/settings/tokens
- Select scopes: `repo`, `workflow`

### Remote Already Exists
```powershell
# Remove and re-add remote
git remote remove origin
git remote add origin https://github.com/Open-Rainbow/PeopleHub.git
```

### Wrong Branch Name
```powershell
# Check current branch
git branch

# Rename if needed
git branch -M main
```

### Large Files / Slow Push
The push might take a moment due to the number of files. Be patient.

---

**Next Steps:**
1. Create the repository on GitHub
2. Run the git push commands
3. Verify on GitHub
4. Share the repository URL with your team!
