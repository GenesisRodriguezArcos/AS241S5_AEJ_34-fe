import axios from 'axios';

const BASE = 'http://localhost:8080/api/v1/face-detection';

export const faceDetectionService = {
  findAllActive:   ()         => axios.get(BASE),
  findAllInactive: ()         => axios.get(`${BASE}/inactive`),
  findById:        (id)       => axios.get(`${BASE}/${id}`),
  detect:          (imageUrl) => axios.post(`${BASE}/detect`, null, { params: { imageUrl } }),
  update:          (id, data) => axios.put(`${BASE}/${id}`, data),
  disable:         (id)       => axios.delete(`${BASE}/${id}`),
  enable:          (id)       => axios.patch(`${BASE}/${id}/enable`),
};
