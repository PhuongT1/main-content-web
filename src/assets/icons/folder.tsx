import React from 'react'

const FolderIcon = ({ width, height, color, stroke }: React.SVGProps<SVGSVGElement>) => (
  <svg width={width || 19} height={height || 16} viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M17.0013 15.9596H2.0013C1.61467 15.9592 1.24401 15.8054 0.970624 15.532C0.697235 15.2586 0.543438 14.8879 0.542969 14.5013V1.5013C0.543438 1.11467 0.697235 0.744012 0.970624 0.470623C1.24401 0.197235 1.61467 0.0434385 2.0013 0.0429688H8.2513C8.47777 0.043429 8.70104 0.0964409 8.90354 0.197833C9.10604 0.299224 9.28225 0.446229 9.41829 0.627277L11.4182 3.29248C11.4375 3.31843 11.4626 3.33952 11.4915 3.35407C11.5204 3.36863 11.5523 3.37624 11.5846 3.3763H17.0013C17.3879 3.37677 17.7586 3.53057 18.032 3.80396C18.3054 4.07735 18.4592 4.44801 18.4596 4.83464V14.5013C18.4592 14.8879 18.3054 15.2586 18.032 15.532C17.7586 15.8054 17.3879 15.9592 17.0013 15.9596ZM2.0013 1.29297C1.94608 1.29307 1.89315 1.31506 1.8541 1.3541C1.81506 1.39315 1.79307 1.44608 1.79297 1.5013V14.5013C1.79307 14.5565 1.81506 14.6095 1.8541 14.6485C1.89315 14.6875 1.94608 14.7095 2.0013 14.7096H17.0013C17.0565 14.7095 17.1095 14.6875 17.1485 14.6485C17.1875 14.6095 17.2095 14.5565 17.2096 14.5013V4.83464C17.2095 4.77941 17.1875 4.72649 17.1485 4.68744C17.1095 4.64839 17.0565 4.62641 17.0013 4.6263H11.5846C11.3582 4.62584 11.1349 4.57283 10.9324 4.47144C10.7299 4.37005 10.5537 4.22304 10.4176 4.04199L8.41773 1.37679C8.39842 1.35084 8.37332 1.32975 8.34443 1.3152C8.31554 1.30064 8.28365 1.29303 8.2513 1.29297H2.0013Z'
      fill={stroke || color || '#101014'}
    />
  </svg>
)

export default FolderIcon
