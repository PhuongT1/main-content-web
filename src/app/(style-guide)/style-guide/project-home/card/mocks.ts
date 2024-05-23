import {
  PROJECT_TYPE_ENUM,
  PROJECT_STATUS_ENUM,
  PROJECT_SHARING_SCOPE_ENUM,
  EXPLORER_ITEM_TYPE_ENUM,
  IFolderDetail
} from '@/app/(main-routes)/project-home/_modules/domain'

export const DATA_CARDS = [
  {
    explorerId: 1,
    createdAt: '2023-08-05T18:24:29.449Z',
    updatedAt: '2023-06-01T04:14:55.881Z',
    itemType: EXPLORER_ITEM_TYPE_ENUM.PROJECT,
    level: 0,
    itemData: {
      id: 5966,
      createdAt: '2022-10-30T05:24:58.657Z',
      updatedAt: '2023-07-28T12:45:42.721Z',
      name: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      description:
        '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      userId: 24,
      type: PROJECT_TYPE_ENUM.INDIVIDUAL,
      isPublic: false,
      numberOfDeck: 9,
      templateId: null,
      imageUrl: '/images/blank-user.png',
      status: PROJECT_STATUS_ENUM.NEW,
      bookmark: false,
      allowReplication: true,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PRIVATE,
      progress: 71,
      participants: [
        {
          userId: 44,
          email: 'user0@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: true,
          username: 'user0',
          nickname: 'User 0',
          sharedDate: '2023-12-10T12:31:55.729Z'
        },
        {
          userId: 99,
          email: 'user1@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user1',
          nickname: 'User 1',
          sharedDate: '2024-03-24T17:38:37.163Z'
        },
        {
          userId: 63,
          email: 'user2@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user2',
          nickname: 'User 2',
          sharedDate: '2023-12-05T00:54:18.822Z'
        }
      ],
      groupCode: '1',
      groupName: 'Group B',
      code: 'PJ240329015',
      totalFeedbacks: 0,
      totalViews: 0,
      totalViewers: 0,
      isCloned: false,
      viewers: [],
      creator: {
        userId: 2,
        email: 'lamkhacduy13@gmail.com',
        avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
        username: 'lamkhacduy13',
        nickname: '성장하는아름다운늑대'
      }
    },
    no: 431
  },
  {
    explorerId: 5,
    createdAt: '2023-08-05T18:24:29.449Z',
    updatedAt: '2023-06-01T04:14:55.881Z',
    itemType: EXPLORER_ITEM_TYPE_ENUM.PROJECT,
    level: 0,
    itemData: {
      id: 5966,
      createdAt: '2022-10-30T05:24:58.657Z',
      updatedAt: '2023-07-28T12:45:42.721Z',
      name: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      description:
        '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      userId: 24,
      type: PROJECT_TYPE_ENUM.OPEN_INNOVATION,
      isPublic: false,
      numberOfDeck: 9,
      templateId: null,
      imageUrl: '/images/blank-user.png',
      status: PROJECT_STATUS_ENUM.NEW,
      bookmark: false,
      allowReplication: true,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PRIVATE,
      progress: 71,
      participants: [
        {
          userId: 44,
          email: 'user0@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: true,
          username: 'user0',
          nickname: 'User 0',
          sharedDate: '2023-12-10T12:31:55.729Z'
        },
        {
          userId: 99,
          email: 'user1@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user1',
          nickname: 'User 1',
          sharedDate: '2024-03-24T17:38:37.163Z'
        },
        {
          userId: 63,
          email: 'user2@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user2',
          nickname: 'User 2',
          sharedDate: '2023-12-05T00:54:18.822Z'
        },
        {
          userId: 52,
          email: 'user2@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user4',
          nickname: 'User 4',
          sharedDate: '2023-12-05T00:54:18.822Z'
        },
        {
          userId: 62,
          email: 'user2@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user5',
          nickname: 'User 5',
          sharedDate: '2023-12-05T00:54:18.822Z'
        }
      ],
      groupCode: '1',
      groupName: 'Group B',
      code: 'PJ240329015',
      totalFeedbacks: 0,
      totalViews: 0,
      totalViewers: 0,
      isCloned: false,
      viewers: [],
      creator: {
        userId: 2,
        email: 'lamkhacduy13@gmail.com',
        avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
        username: 'lamkhacduy13',
        nickname: '성장하는아름다운늑대'
      }
    },
    no: 431
  },
  {
    explorerId: 2,
    createdAt: '2023-12-28T03:22:28.499Z',
    updatedAt: '2023-03-22T02:04:11.979Z',
    itemType: EXPLORER_ITEM_TYPE_ENUM.PROJECT,
    level: 0,
    itemData: {
      id: 3237,
      createdAt: '2023-01-03T18:02:38.005Z',
      updatedAt: '2023-01-21T08:19:26.271Z',
      name: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      description:
        '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      userId: 73,
      type: PROJECT_TYPE_ENUM.INDIVIDUAL,
      isPublic: false,
      numberOfDeck: 4,
      templateId: null,
      imageUrl: '/images/blank-user.png',
      status: PROJECT_STATUS_ENUM.DONE,
      bookmark: false,
      allowReplication: true,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PRIVATE,
      progress: 100,
      participants: [
        {
          userId: 47,
          email: 'user0@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user0',
          nickname: 'User 0',
          sharedDate: '2022-10-31T08:08:07.768Z'
        },
        {
          userId: 43,
          email: 'user1@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user1',
          nickname: 'User 1',
          sharedDate: '2023-05-21T13:31:17.369Z'
        }
      ],
      groupCode: '2',
      groupName: 'Group B',
      code: 'PJ240329015',
      totalFeedbacks: 0,
      totalViews: 0,
      totalViewers: 0,
      isCloned: false,
      viewers: [],
      creator: {
        userId: 2,
        email: 'lamkhacduy13@gmail.com',
        avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
        username: 'lamkhacduy13',
        nickname: '성장하는아름다운늑대'
      }
    },
    no: 53
  },
  {
    explorerId: 3,
    createdAt: '2023-05-17T13:50:19.260Z',
    updatedAt: '2023-08-26T07:32:26.847Z',
    itemType: EXPLORER_ITEM_TYPE_ENUM.PROJECT,
    level: 0,
    itemData: {
      id: 223,
      createdAt: '2022-09-09T08:24:34.838Z',
      updatedAt: '2023-10-24T05:59:33.355Z',
      name: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      description:
        '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      userId: 6,
      type: PROJECT_TYPE_ENUM.GROUP,
      isPublic: false,
      numberOfDeck: 8,
      templateId: null,
      imageUrl: '/images/blank-user.png',
      status: PROJECT_STATUS_ENUM.IN_PROGRESS,
      bookmark: true,
      allowReplication: false,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PARTIAL_PUBLIC,
      progress: 50,
      participants: [
        {
          userId: 33,
          email: 'user0@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user0',
          nickname: 'User 0',
          sharedDate: '2023-09-28T19:25:12.387Z'
        },
        {
          userId: 93,
          email: 'user1@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user1',
          nickname: 'User 1',
          sharedDate: '2023-06-03T22:14:49.758Z'
        }
      ],
      groupCode: '2',
      groupName: 'Group B',
      code: 'PJ240329015',
      totalFeedbacks: 0,
      totalViews: 0,
      totalViewers: 0,
      isCloned: false,
      viewers: [],
      creator: {
        userId: 2,
        email: 'lamkhacduy13@gmail.com',
        avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
        username: 'lamkhacduy13',
        nickname: '성장하는아름다운늑대'
      }
    },
    no: 588
  },
  {
    explorerId: 6,
    createdAt: '2023-08-05T18:24:29.449Z',
    updatedAt: '2023-06-01T04:14:55.881Z',
    itemType: EXPLORER_ITEM_TYPE_ENUM.AD,
    level: 0,
    itemData: {
      id: 5967,
      createdAt: '2022-10-30T05:24:58.657Z',
      updatedAt: '2023-07-28T12:45:42.721Z',
      name: '슘페터가 처음이신가요?',
      description: '슘페터 Saas 프로그램 가이드를 먼저 살펴보세요.',
      userId: 24,
      type: PROJECT_TYPE_ENUM.INDIVIDUAL,
      isPublic: false,
      numberOfDeck: 9,
      templateId: null,
      imageUrl: '/images/background-naver.png',
      status: PROJECT_STATUS_ENUM.NEW,
      bookmark: false,
      allowReplication: true,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PRIVATE,
      progress: 71,
      participants: [
        {
          userId: 44,
          email: 'user0@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: true,
          username: 'user0',
          nickname: 'User 0',
          sharedDate: '2023-12-10T12:31:55.729Z'
        },
        {
          userId: 99,
          email: 'user1@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user1',
          nickname: 'User 1',
          sharedDate: '2024-03-24T17:38:37.163Z'
        },
        {
          userId: 63,
          email: 'user2@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user2',
          nickname: 'User 2',
          sharedDate: '2023-12-05T00:54:18.822Z'
        },
        {
          userId: 52,
          email: 'user2@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user4',
          nickname: 'User 4',
          sharedDate: '2023-12-05T00:54:18.822Z'
        },
        {
          userId: 62,
          email: 'user2@example.com',
          avatarUrl: '/images/blank-user.png',
          isBlocked: false,
          username: 'user5',
          nickname: 'User 5',
          sharedDate: '2023-12-05T00:54:18.822Z'
        }
      ],
      groupCode: '1',
      groupName: 'Group B',
      code: 'PJ240329015',
      totalFeedbacks: 0,
      totalViews: 0,
      totalViewers: 0,
      isCloned: false,
      viewers: [],
      creator: {
        userId: 2,
        email: 'lamkhacduy13@gmail.com',
        avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
        username: 'lamkhacduy13',
        nickname: '성장하는아름다운늑대'
      }
    },
    no: 431
  },
  {
    explorerId: 4,
    createdAt: '2023-08-05T18:24:29.449Z',
    updatedAt: '2023-06-01T04:14:55.881Z',
    itemType: EXPLORER_ITEM_TYPE_ENUM.NOTICE,
    level: 0,
    itemData: {
      id: 5966,
      createdAt: '2022-10-30T05:24:58.657Z',
      updatedAt: '2023-07-28T12:45:42.721Z',
      name: '슘페터가 처음이신가요?',
      description: '슘페터 Saas 프로그램 가이드를 먼저 살펴보세요.',
      userId: 24,
      type: PROJECT_TYPE_ENUM.INDIVIDUAL,
      isPublic: false,
      numberOfDeck: 9,
      templateId: null,
      imageUrl: '/images/blank-user.png',
      status: PROJECT_STATUS_ENUM.NEW,
      bookmark: false,
      allowReplication: true,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PRIVATE,
      progress: 71,
      participants: [],
      groupCode: '1',
      groupName: 'Group B',
      code: 'PJ240329015',
      totalFeedbacks: 0,
      totalViews: 0,
      totalViewers: 0,
      isCloned: false,
      viewers: [],
      creator: {
        userId: 2,
        email: 'lamkhacduy13@gmail.com',
        avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
        username: 'lamkhacduy13',
        nickname: '성장하는아름다운늑대'
      }
    },
    no: 431
  },
  {
    explorerId: 41,
    createdAt: '2023-08-05T18:24:29.449Z',
    updatedAt: '2023-06-01T04:14:55.881Z',
    itemType: EXPLORER_ITEM_TYPE_ENUM.FOLDER,
    level: 0,
    itemData: {
      id: 59690,
      createdAt: '2022-10-30T05:24:58.657Z',
      updatedAt: '2023-07-28T12:45:42.721Z',
      name: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      description: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
      userId: 24,
      type: PROJECT_TYPE_ENUM.INDIVIDUAL,
      isPublic: false,
      numberOfDeck: 9,
      templateId: null,
      imageUrl: '/images/blank-user.png',
      status: PROJECT_STATUS_ENUM.NEW,
      bookmark: false,
      allowReplication: true,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PRIVATE,
      progress: 71,
      participants: [],
      groupCode: '100',
      groupName: '한양대학교 창업지원단',
      code: 'PJ240329015',
      totalFeedbacks: 0,
      totalViews: 0,
      totalViewers: 0,
      isCloned: false,
      viewers: [],
      creator: {
        userId: 2,
        email: 'lamkhacduy13@gmail.com',
        avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
        username: 'lamkhacduy13',
        nickname: '성장하는아름다운늑대'
      }
    },
    no: 431
  }
]

export const GROUP_PROJECT_CARD = {
  explorerId: 40,
  createdAt: '2023-08-05T18:24:29.449Z',
  updatedAt: '2023-06-01T04:14:55.881Z',
  level: 0,
  itemType: EXPLORER_ITEM_TYPE_ENUM.GROUP_PROJECT,
  itemData: {
    id: 59699,
    createdAt: '2022-10-30T05:24:58.657Z',
    updatedAt: '2023-07-28T12:45:42.721Z',
    name: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
    description: '지역 사회의 문화 발전을 위한 아티스트 레지던시 프로그램 플랫폼',
    userId: 24,
    type: PROJECT_TYPE_ENUM.INDIVIDUAL,
    isPublic: false,
    numberOfDeck: 9,
    templateId: null,
    imageUrl: '/images/blank-user.png',
    status: PROJECT_STATUS_ENUM.NEW,
    bookmark: false,
    allowReplication: true,
    sharingScope: PROJECT_SHARING_SCOPE_ENUM.PRIVATE,
    progress: 71,
    participants: [],
    groupCode: '100',
    groupName: '한양대학교 창업지원단',
    code: 'PJ240329015',
    totalFeedbacks: 0,
    totalViews: 0,
    totalViewers: 0,
    isCloned: false,
    viewers: [],
    creator: {
      userId: 2,
      email: 'lamkhacduy13@gmail.com',
      avatarUrl: 'https://d341rnu99jxucb.cloudfront.net/common/2024/1/1705341456734-pprhnh',
      username: 'lamkhacduy13',
      nickname: '성장하는아름다운늑대'
    }
  },
  no: 431
}

export const FOLDER_DETAIL: IFolderDetail = {
  id: 20,
  createdAt: '2024-04-10T09:21:15.981Z',
  updatedAt: '2024-04-10T09:21:15.981Z',
  name: 'FOLDER 5',
  description: '',
  parentId: null,
  totalItems: 0,
  explorerId: 48,
  templateId: null,
  level: 1,
  totalProjects: 2,
  totalFolders: 1,
  totalMembers: 1,
  groupName: '',
  parents: []
}
