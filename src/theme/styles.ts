export const globalStyles = {
  global: {
    '::-webkit-scrollbar': {
      height: '8px',
      width: '8px'
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '8px'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '8px'
    },
    html: {
      scrollBehavior: 'smooth'
    },
    body: {
      color: 'customGray',
      backgroundColor: 'mainBackgroundColor'
    }
  }
};
