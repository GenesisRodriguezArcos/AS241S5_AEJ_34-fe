import axios from 'axios';

const BASE = 'http://localhost:8080/api/v1/face-analysis';

export const faceAnalysisService = {
  findAllActive:   ()         => axios.get(BASE),
  findAllInactive: ()         => axios.get(`${BASE}/inactive`),
  findById:        (id)       => axios.get(`${BASE}/${id}`),
  analyze:         (imageUrl) => axios.post(`${BASE}/analyze`, null, { params: { imageUrl } }),
  update:          (id, data) => axios.put(`${BASE}/${id}`, data),
  disable:         (id)       => axios.delete(`${BASE}/${id}`),
  enable:          (id)       => axios.patch(`${BASE}/${id}/enable`),
};
