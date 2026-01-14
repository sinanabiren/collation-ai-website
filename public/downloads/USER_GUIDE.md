# Collation Studio - User Guide

Welcome to Collation Studio! This guide will help you understand and use all the features of this powerful development tool.

## Table of Contents
- [Getting Started](#getting-started)
- [User Interface Overview](#user-interface-overview)
- [Opening Your Project](#opening-your-project)
- [Terminal](#terminal)
- [Browser Preview](#browser-preview)
- [Code Editor](#code-editor)
- [Server Management](#server-management)
- [Database Tools](#database-tools)
- [Tips & Tricks](#tips--tricks)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### What is Collation Studio?

Collation Studio is an all-in-one development environment that combines:
- A **terminal** for running commands
- A **browser preview** to see your web applications live
- A **code editor** for viewing and editing files
- **Server management** to start and stop development servers
- **Database tools** for querying PostgreSQL databases

Everything you need is in one window, making web development easier and more efficient.

---

## User Interface Overview

When you open Collation Studio, you'll see:

### Top Toolbar
The toolbar at the top contains all the main controls:

1. **Open Folder** (Blue button) - Click this to select your project folder
2. **Terminal** - Toggle the terminal panel on/off
3. **Servers** - Open the server management panel
4. **Database** - Open the SQL query editor
5. **Browser/Editor** toggle - Switch between browser preview and code editor views

### Main Area
The main area shows either:
- **Browser Preview** - See your running web application
- **Code Editor** - View and edit your code files

### Terminal (Left Side)
The terminal is where you run commands like:
- `npm install` - Install project dependencies
- `npm run dev` - Start development servers
- `git status` - Check your code changes
- And any other command-line tools you need

---

## Opening Your Project

### Step 1: Click "Open Folder"
Click the blue **Open Folder** button in the top-left corner of the toolbar.

### Step 2: Select Your Project
Navigate to your project folder and click "Select Folder" (or "Open" on some systems).

### Step 3: Verify
Once selected, you'll see your folder name displayed in the toolbar next to the Open Folder button.

**Note:** If your project is a Git repository, you'll also see the current branch name displayed.

---

## Terminal

The terminal is your command-line interface within Collation Studio.

### Basic Usage

1. **Type commands** - Click in the terminal and type any command
2. **Run commands** - Press `Enter` to execute
3. **Multi-line input** - Press `Ctrl+Enter` or `Shift+Enter` to add new lines without executing
4. **Copy text** - Select text and press `Ctrl+Shift+C`
5. **Paste text** - Press `Ctrl+Shift+V`

### Common Commands

```bash
# Navigate to a directory
cd my-folder

# List files
ls

# Install dependencies
npm install

# Start a development server
npm run dev

# Check Git status
git status

# Create a new file
touch newfile.txt
```

### Hiding the Terminal
Click the **Terminal** button in the toolbar to hide/show the terminal panel.

---

## Browser Preview

The Browser Preview lets you see your running web application without leaving Collation Studio.

### Starting a Preview

1. **Start your server** in the terminal (e.g., `npm run dev`)
2. Wait 2 seconds for the server to start
3. The app will automatically switch to **Browser** view and detect your running server
4. Your application will load in the preview panel

### Manual Server Selection

If automatic detection doesn't work:

1. Click the dropdown at the top of the Browser Preview
2. Select your server from "Running Servers" section
3. Or choose "Custom URL..." to enter a URL manually

### Browser Controls

- **Refresh button** (circular arrow icon) - Reload the page
- **Camera button** - Take a screenshot of the entire window
- **Stop button** (red square) - Stop a running server (only shown for detected servers)

### Screenshots

When you click the camera button:
1. A screenshot is captured of the entire Collation Studio window
2. A notification appears with the file path
3. **Click the path** to select it, then press `Ctrl+C` to copy
4. You can paste this path into Claude Code's chat to share the screenshot

**Important:** Paste the screenshot path in the Claude Code **message box** (where you type messages), NOT in the terminal!

### External Websites

You can also preview external websites:
1. Select "Custom URL..." from the dropdown
2. Enter a website address (e.g., `example.com` or `localhost:8080`)
3. Click "Go"

**Note:** Some websites may not allow embedding and will show a message to open in your browser instead.

---

## Code Editor

The Code Editor lets you view and edit your project files.

### Opening Files

1. Click the **Editor** button in the toolbar to switch to editor view
2. Use the **file tree** on the left to browse your project
3. Click any file to open it

### Working with Files

- **Edit files** - Click in the editor and start typing
- **Save changes** - Press `Ctrl+S` (or `Cmd+S` on Mac)
- **Multiple tabs** - Open multiple files, they'll appear as tabs at the top
- **Close tabs** - Click the X on any tab to close it
- **Switch tabs** - Click on any tab to switch to that file

### File Tree Navigation

- **Folders** - Click to expand/collapse
- **Files** - Click to open in the editor
- **Navigate up** - Click "Parent Directory" to go up one level

### Editor Features

The editor includes:
- **Syntax highlighting** for many programming languages
- **Line numbers** for easy reference
- **Auto-save indicator** - Tabs show a dot when they have unsaved changes
- **Save confirmation** - A notification appears when files are saved successfully

---

## Server Management

The Server Management panel helps you start and monitor development servers.

### Opening Server Management

Click the **Servers** button in the toolbar to open the panel.

### Starting a Server

1. Click **Add Server** in the panel
2. Enter a name (e.g., "Dev Server")
3. Enter the command (e.g., `npm run dev`)
4. Click **Create**
5. Click **Start** to run the server

### Monitoring Servers

Each server shows:
- **Name** - The server name you provided
- **Status** - Whether it's running or stopped
- **Output** - Real-time logs from the server
- **Controls** - Start/Stop buttons

### Server Output

The output panel shows:
- **Standard output** - Normal server messages
- **Errors** - Highlighted in a different color
- **Real-time updates** - New messages appear as they happen

### Managing Servers

- **Start** - Click the green "Start" button
- **Stop** - Click the red "Stop" button
- **Delete** - Click "Delete" to remove a server (only when stopped)
- **Edit** - Update the command or working directory

**Tip:** Servers automatically use your current project folder as their working directory.

---

## Database Tools

The Database panel provides a powerful SQL query editor for PostgreSQL databases.

### Opening the Database Panel

Click the **Database** button in the toolbar to open the panel.

### Connecting to a Database

#### First Time Setup

1. Click **Setup Credentials** in the Database panel
2. Fill in your database information:
   - **Host** - Usually `localhost` or your server address
   - **Port** - Usually `5432` for PostgreSQL
   - **Database** - Your database name
   - **User** - Your database username
   - **Password** - Your database password
   - **SSL/TLS** - Toggle ON if your database requires secure connection (recommended)

3. Click **Test Connection** to verify your credentials
4. If successful, click **Save Credentials**

**Security Note:** Your credentials are encrypted and stored locally on your computer.

#### Loading Saved Credentials

If you've saved credentials before:
1. Click **Load Saved Credentials**
2. Your information will be loaded automatically
3. You can test the connection again if needed

### Writing Queries

The SQL editor includes:
- **Syntax highlighting** for SQL
- **Multi-line editing** - Write complex queries easily
- **Query history** - Your queries are saved in `queries.sql`

#### Example Queries

```sql
-- Select all records
SELECT * FROM users;

-- Filter results
SELECT name, email
FROM users
WHERE created_at > '2024-01-01';

-- Join tables
SELECT orders.id, users.name, orders.total
FROM orders
JOIN users ON orders.user_id = users.id;

-- Count records
SELECT COUNT(*) as total_users FROM users;
```

### Running Queries

1. Write your SQL query in the editor
2. Click **Execute Query** (or press `Ctrl+Enter`)
3. Results appear in the panel below

### Viewing Results

The results panel shows:
- **Total row count** at the top
- **Data table** with all columns and rows
- **Pagination controls** (if more than 200 rows)
  - Navigate with Previous/Next buttons
  - Change rows per page (100, 200, 500, 1000)

### Working with Results

- **Scroll horizontally** - Use the scrollbar to see all columns
- **Resize panel** - Drag the divider to make the results panel taller/shorter
- **Export to CSV** - Click the **Export CSV** button to save results to a file

### CSV Export

When you export:
1. Click **Export CSV** button
2. A CSV file is created in your project folder
3. Filename format: `query_results_YYYY-MM-DD.csv`
4. A notification shows the filename

### Query Tips

- **End queries with semicolon** - Though not always required, it's good practice
- **Comment your queries** - Use `--` for single-line comments
- **Test with LIMIT** - Add `LIMIT 10` to test queries before running on all data
- **Save your work** - Queries are auto-saved to `queries.sql` in your project folder

---

## Tips & Tricks

### Keyboard Shortcuts

**Terminal:**
- `Ctrl+Shift+C` - Copy selected text
- `Ctrl+Shift+V` - Paste text
- `Ctrl+Enter` - New line (in Claude Code)
- `Shift+Enter` - New line (in Claude Code)

**Editor:**
- `Ctrl+S` (or `Cmd+S`) - Save current file

**Database:**
- `Ctrl+Enter` - Execute query

### Workflow Suggestions

#### Web Development
1. Open your project folder
2. Start your dev server in Terminal or Server Management
3. Use Browser Preview to see live changes
4. Use Editor to modify code
5. Switch back to Browser to see updates

#### Database Work
1. Open Database panel
2. Load your credentials
3. Write and test queries
4. Export results to CSV when needed
5. Queries are saved automatically

#### Full-Stack Development
1. Open project folder
2. Start backend server (e.g., `npm run server`)
3. Start frontend server (e.g., `npm run dev`)
4. Use Browser Preview for the frontend
5. Use Database panel for database queries
6. Monitor both servers in Server Management
7. Use Terminal for git commands and other tools

### Resizing Panels

You can resize various panels by dragging their borders:
- **Terminal width** - Drag the vertical divider between terminal and main area
- **SQL panel width** - Drag the divider on the left edge of the SQL panel
- **SQL results height** - Drag the horizontal divider between query editor and results

---

## Troubleshooting

### My server isn't detected in Browser Preview

**Solutions:**
1. Make sure your server is running (check Terminal output)
2. Wait 2-3 seconds after starting the server
3. Click the **Refresh** button in Browser Preview
4. Manually enter the URL using "Custom URL..."

### Terminal isn't responding

**Solutions:**
1. Try clicking in the terminal window first
2. Check if a command is still running (you won't see a new prompt)
3. Press `Ctrl+C` to cancel the current command
4. Toggle Terminal off and on using the toolbar button

### Can't save files in Editor

**Solutions:**
1. Check that you have write permissions for the file
2. Make sure the file isn't open in another program
3. Try closing and reopening the file
4. Check the Terminal for any error messages

### Database connection fails

**Solutions:**
1. Verify your database is running
2. Check your credentials are correct
3. Ensure the port number is correct (usually 5432)
4. Try toggling SSL/TLS on or off
5. Check firewall settings aren't blocking the connection
6. For local databases, try `localhost` or `127.0.0.1` for the host

### Browser Preview shows "X-Frame-Options" error

**Explanation:** Some websites prevent embedding in iframes for security.

**Solution:** Click the "Open in Browser" button to view in your default web browser.

### Screenshot path isn't copying

**Solution:**
1. Click the file path shown in the notification
2. It will auto-select
3. Press `Ctrl+C` to copy
4. Paste into Claude Code's **message input box** (not the terminal)

### Application errors when closing

This usually happens when background processes are still running.

**Prevention:**
1. Stop all servers before closing
2. Let the application fully load before closing
3. Use the X button to close (not killing the process)

---

## Additional Help

### Where are my files?

All your project files are in the folder you selected with "Open Folder". Collation Studio doesn't move or modify your files unless you explicitly save changes.

### Where are queries saved?

SQL queries are automatically saved to `queries.sql` in your current project folder.

### Where are credentials stored?

Database credentials are encrypted and stored in `.collation-db-credentials.enc` in your project folder. This file is encrypted for security.

### Where are screenshots saved?

Screenshots are saved to your system's temporary folder:
- **Linux/WSL:** `/tmp/`
- **macOS:** `/var/folders/...`
- **Windows:** `%TEMP%`

The exact path is shown when you take a screenshot.

### Getting More Help

- Check the `README.md` file in the application folder for technical details
- Review the `CLAUDE.md` file for development information
- Report issues or ask questions on the project's GitHub repository

---

## Quick Reference

### Top Toolbar Buttons (Left to Right)

1. **Open Folder** (Blue) - Select your project
2. **Terminal** - Toggle terminal panel
3. **Servers** - Manage development servers
4. **Database** - SQL query editor
5. **Browser** - Switch to browser preview
6. **Editor** - Switch to code editor

### Common Tasks

| Task | Steps |
|------|-------|
| Start working on a project | Click "Open Folder" → Select folder → Start server in Terminal |
| Preview website | Start server → Wait 2 seconds → Browser auto-loads |
| Edit code | Click "Editor" → Browse file tree → Click file → Edit → Ctrl+S to save |
| Run SQL query | Click "Database" → Load credentials → Write query → Execute |
| Take screenshot | In Browser view → Click camera icon → Copy path from notification |
| Manage servers | Click "Servers" → Add/Start/Stop as needed |

---

**Happy coding with Collation Studio!** 🚀
