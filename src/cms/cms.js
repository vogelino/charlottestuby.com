import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import PressPagePreview from './preview-templates/PressPagePreview'
import WorkPreview from './preview-templates/WorkPreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('press', PressPagePreview)
CMS.registerPreviewTemplate('work', WorkPreview)
