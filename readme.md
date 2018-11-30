# React Native Simple Notes with Redux

*This is part of my progress while learning React Native, and one of a task while doing Bootcamp in Arkademy.*

**Features and notes about the app:**
- Add note
- Automatically save/update note when the back key (both in-app and phone) is pressed
- Update note and autofocus when updating existing note
- Delete single note by drag to left
- Delete few notes or all notes by pressing the "Edit" button
- "Edit" button is disabled when there is no note
- Confirmation on delete
- Switch view to list and grid mode
- Date automatically set to the time when you create or edit the note
- The date will show "Today" when added/edited current day, show day name (example "Monday", "Wednesday") when edited/added between 1-6 days ago, and show "DD/MM/YY" when edited/added more than 6 days ago
- First line/paragraph will be the title, the second one will be sub-title
- If there is no more than 1 line, sub-title will be 'no additional text"


**Known Issues:**
- Unable to delete when in grid mode
- Row(s) not collapsed when the "Edit" button is pressed
- Sometimes the note is added two times when back key is pressed two times very fast
- If there is line but an empty line (like space or enter) in line 2, sub-title will be blank
- (FIXED) **Note(s) will be deleted if the app is closed**

Todo:
- (Done) Add Redux Logger and Redux Persist
- Add gif/screenshot for documentation
- Add video for documentation (Indonesian / Bahasa language)