# 🧪 Test Plan - Metatag Vibe Checker

## Test Scenarios

### ✅ Basic Functionality Tests
1. **Valid URLs with complete metadata**
   - `https://github.com` - Should have full OpenGraph + Twitter cards
   - `https://vercel.com` - Modern site with complete metadata
   - `https://nextjs.org` - Documentation site

2. **URLs without protocol**
   - `github.com` - Should auto-prepend https://
   - `vercel.com` - Should normalize correctly

3. **URLs with missing metadata**
   - Sites with only basic title/description
   - Sites missing OpenGraph tags
   - Sites missing Twitter cards

### ⚠️ Edge Cases to Test
1. **Invalid URLs**
   - `not-a-url` - Should show validation error
   - `https://fake-domain.invalid` - Should show network error
   - Empty input - Should show required field error

2. **Network Issues**
   - `https://httpstat.us/404` - Test 404 handling
   - `https://httpstat.us/500` - Test server error handling
   - Very slow sites - Test timeout handling

3. **Content Issues**
   - Non-HTML content (PDFs, images)
   - Sites with no content
   - Sites with malformed HTML

4. **Image Issues**
   - OpenGraph images that fail to load
   - Very large images
   - Invalid image URLs

### 📱 Responsive Design Tests
1. **Mobile (375px)**
   - URL input should be full width
   - Score cards should stack vertically
   - Previews should be readable

2. **Tablet (768px)**
   - Score cards should show 2 columns
   - Previews should show 2 columns

3. **Desktop (1024px+)**
   - Score cards should show 3 columns
   - Previews should show 3 columns

### 🎯 Performance Tests
1. **Loading States**
   - Verify loading spinner appears
   - Check buttons are disabled during loading
   - Ensure error states clear properly

2. **Multiple Requests**
   - Test rapid successive requests
   - Verify state management

### 📊 Scoring Tests
1. **Perfect Scores (80-100)**
   - Sites with complete, optimized metadata
   - Proper character lengths
   - All required tags present

2. **Good Scores (60-79)**
   - Sites with most metadata but some issues
   - Character lengths slightly off

3. **Poor Scores (0-59)**
   - Sites missing critical metadata
   - No OpenGraph or Twitter cards

## Expected Results

### Sample Score Ranges
- **GitHub.com**: Should score 85-95 (excellent metadata)
- **Vercel.com**: Should score 90-100 (perfect metadata)
- **Basic HTML page**: Should score 20-40 (minimal metadata)

### Error Messages
- Network errors should be user-friendly
- Validation errors should be clear
- Loading states should be informative

### Visual Appearance
- Platform previews should match actual appearance
- Score cards should use proper color coding
- Mobile layout should be usable

## Known Limitations
1. **CORS Issues**: Some sites may block requests
2. **Client-side fetching**: Limited by browser security
3. **Rate limiting**: Some sites may block rapid requests
4. **Image loading**: External images may fail to load 