const MoreIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || 3}
      height={props.height || 14}
      viewBox='0 0 3 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='1.5' cy='1.69922' r='1.5' fill={props.color || '#9F9EA4'} />
      <circle cx='1.5' cy='6.69922' r='1.5' fill={props.color || '#9F9EA4'} />
      <circle cx='1.5' cy='11.6992' r='1.5' fill={props.color || '#9F9EA4'} />
    </svg>
  )
}

export default MoreIcon
