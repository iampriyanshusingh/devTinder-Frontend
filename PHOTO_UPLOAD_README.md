# Photo Upload Functionality

## Overview
Photo upload functionality has been added to both the signup form and profile editing in the DevTinder frontend application.

## Features Added

### 1. Signup Form Photo Upload
- **Location**: `src/pages/Signup.js`
- **Features**:
  - Photo upload field with drag-and-drop visual feedback
  - Image preview before submission
  - File validation (image type and size < 5MB)
  - Remove photo option
  - Responsive design with proper error handling

### 2. Profile Photo Management
- **Location**: `src/pages/Profile.js`
- **Features**:
  - Display current profile photo
  - Change photo functionality
  - Remove photo option
  - Real-time preview updates

### 3. Photo Display Across Components
- **Updated Components**:
  - `src/components/Navbar.js` - User avatar in navigation
  - `src/pages/Feed.js` - User cards in the main feed
  - `src/pages/Connections.js` - Connection cards
  - `src/pages/Requests.js` - Request cards

### 4. Backend Integration
- **Location**: `src/contexts/AuthContext.js`
- **Features**:
  - Automatic FormData handling for photo uploads
  - Proper Content-Type headers for multipart/form-data
  - Photo field included in signup and profile update requests

## Technical Implementation

### File Validation
- **File Type**: Only image files accepted (`image/*`)
- **File Size**: Maximum 5MB limit
- **Error Handling**: User-friendly error messages

### State Management
- **Photo Preview**: Real-time preview using FileReader API
- **Form Data**: Photo field integrated with existing form state
- **Error States**: Photo-specific error handling

### CSS Classes Added
```css
.photo-upload-area
.photo-upload-input
.photo-preview
.photo-placeholder
.profile-image.small
```

## Usage

### For Users
1. **During Signup**: Upload a profile photo while creating account
2. **Profile Management**: Change or remove profile photo anytime
3. **Visual Feedback**: See photo previews before saving

### For Developers
1. **Form Handling**: Photo uploads automatically handled as FormData
2. **API Integration**: Backend receives photos via multipart/form-data
3. **Component Updates**: All user photo displays automatically updated

## API Endpoints
- **Signup**: `POST /api/signup` (supports multipart/form-data)
- **Profile Update**: `PATCH /api/profile/edit` (supports multipart/form-data)

## Browser Compatibility
- Modern browsers with FileReader API support
- Fallback to text-based avatar for unsupported browsers

## Future Enhancements
- Multiple photo support
- Photo cropping and editing
- Drag and drop file uploads
- Image compression and optimization
