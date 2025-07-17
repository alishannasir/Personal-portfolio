interface Project {
  id: string;
  title: string;
  image: string;
  url: string;
}

export const projects: Project[] = [
    {
      id: 'stenger-bike',
      title: 'Stenger Bike',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      url: '/projects/stenger-bike',
    },
    {
      id: 'mate-libre',
      title: 'Mate Libre',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      url: 'https://example.com/mate-libre',
    },
    {
      id: 'lightship',
      title: 'Lightship',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      url: 'https://example.com/lightship',
    },
    {
      id: 'pangram-pangram',
      title: 'Pangram Pangram',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      url: 'https://example.com/pangram-pangram',
    },
    {
      id: 'baillat-studio',
      title: 'Baillat Studio',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      url: 'https://example.com/baillat-studio',
    },
  ];
  