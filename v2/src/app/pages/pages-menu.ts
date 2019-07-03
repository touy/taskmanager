import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ວຽກຂອງຂ້ອຍ',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'ວຽກທີ່ຂ້ອຍດູແລ',
    icon: 'ion-document-text',
    link: '/pages/dashboard-them',
  },
  {
    title: 'Menu',
    group: true,
  },
  {
    title: 'Planing',
    icon: 'ion-document',
    children: [
      {
        title: 'Document',
        link: '',
        children: [
          {
            title: 'My ',
            link: '/pages/Plan-document-my',
    
          },
          {
            title: 'Groups ',
            link: '/pages/extra-components/stepper',
          },
          {
            title: 'Them ',
            link: '/pages/extra-components/stepper',
          },
          {
            title: 'Department ',
            link: '/pages/extra-components/stepper',
          },
         
         
        ],

      },
      {
        title: 'Job',
        link: '/pages/Plan-jobs',
      },
     
     
    ],
  },
  {
    title: 'Manage',
    icon: 'nb-compose',
    children: [
      {
        title: 'Apply',
        link: '/pages/Apply',
      },
      {
        title: 'Score',
        link: '/pages/Score',
      },
     
    ],
  },
  {
    title: 'Jobs',
    icon: 'ion-clipboard',
    children: [
      {
        title: 'Jobs of day',
        link: '/pages/jobs_of_day',
      },
     
     
    ],
  },
  {
    title: 'User',
    icon: 'nb-person',
    children: [
      {
        title: 'User list',
        link: '/pages/user',
      },
     
     
    ],
  },
  {
    title: 'Repoprt',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Report 1',
        link: '/pages/forms/inputs',
      },
     
     
    ],
  },
  
];