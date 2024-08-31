const axios = require('axios');
const FormData = require('form-data');

const IMGBB_API_KEY = 'a6d456d255d1ba19fb79c3ba85d9871d';

async function uploadToImageBB(imageBuffer) {
  const form = new FormData();
  form.append('image', imageBuffer.toString('base64'));

  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, form, {
      headers: form.getHeaders()
    });
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading to ImageBB:', error);
    throw new Error('Failed to upload image');
  }
}

module.exports = uploadToImageBB;
