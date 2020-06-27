const MOVIE = {
  input: [
    { label: 'Tên', type: 'text', name: 'title' },
    { label: 'Tên tiếng anh', type: 'text', name: 'title_en' },
    { label: 'Mô tả', type: 'text', name: 'description' },
    { label: 'Thời lượng', type: 'number', name: 'duration' },
    { label: 'Đạo diễn', type: 'text', name: 'director' },
    { label: 'Quốc gia', type: 'text', name: 'nation' },
    { label: 'Ngày ra mắt', type: 'text', name: 'release_date' },
    { label: 'Link', type: 'text', name: 'url' },
  ],

  tags: [
    { name: 'Viễn tưởng', value: 'sci-fi' },
    { name: 'Phiêu lưu', value: 'adventure' },
    { name: 'Hành động', value: 'action' },
    { name: 'Thể thao', value: 'sport' },
    { name: 'Hài', value: 'comedy' },
    { name: 'Kinh dị', value: 'horror' },
    { name: 'Chiến tranh', value: 'war' },
    { name: 'Hoạt hình', value: 'anime' },
  ],
};

export default MOVIE;
