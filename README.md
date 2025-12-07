## Final Project Enhancement

### Enhancement(s) Implemented

**Comments System (Full CRUD + Authorization)**  
This enhancement adds a complete commenting feature to the blog application.  
Authenticated users can create, view, edit, and delete comments on posts.

---

### Video Demonstration

Demo link with voiceover
https://youtu.be/dAwd6x2KIkg

Demo link without voiceover
https://youtu.be/rbHJsXxz18Y

---

### Features Added

- Users can add comments to any post (requires login)
- Comments display author name and timestamp
- Users can edit their own comments
- Users can delete their own comments (with confirmation)
- Live UI updates after add/edit/delete
- Comment count updates dynamically
- Backend authorization prevents editing/deleting other users’ comments
- Form validation (empty comments & max length enforced)
- Comments persist across page refreshes
- Error and loading states added for better UX

---

### Technical Implementation

#### **Backend**
- Added `models/Comment.js` for comment schema
- Added new API routes in `server.js`:
  - `POST /api/posts/:postId/comments` — create comment
  - `GET /api/posts/:postId/comments` — retrieve comments for a post
  - `PUT /api/comments/:id` — update comment (owner only)
  - `DELETE /api/comments/:id` — delete comment (owner only)
- Integrated validation via `express-validator`
- Added authorization middleware (`auth`) to protect sensitive routes
- Used Mongoose population to pull user name with comments

#### **Frontend**
- Created comment components:
  - `CommentForm.jsx`
  - `CommentItem.jsx`
  - `CommentList.jsx`
- Updated `PostDetail.jsx` to render the comments section
- Added comment UI styles in `Comments.css`
- Added new API functions to `services/api.js`:
  - `getComments()`
  - `addComment()`
  - `updateComment()`
  - `deleteComment()`
- Used React state and effects to fetch and render comments
- Used AuthContext to check authentication & user ownership

#### Key Challenges Solved
- Enforcing comment ownership for edit/delete
- Building a reusable form component for both add/edit
- Managing optimistic UI updates after CRUD operations
- Handling nested data relationships (Post → Comments)
- Ensuring protected routes ignore unauthorized users
- Synchronizing backend & frontend state in real time

---

### New Dependencies

- **None required**  
  (The enhancement uses existing project dependencies: React, Axios, Mongoose, express-validator, and JWT auth.)

---

### Setup Instructions

1. Install backend and frontend dependencies:
   ```bash
   npm install
   cd client
   npm install