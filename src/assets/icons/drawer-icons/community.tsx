import { SVGProps } from 'react';

const CommunityIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		viewBox='0 0 24 24'
		fill='none'
		{...props}>
		<path
			d='M16.5 10.5H16.49M12 10.5H11.99M7.5 10.5H7.49M17 18V20.3355C17 20.8684 17 21.1348 16.8908 21.2716C16.7958 21.3906 16.6517 21.4599 16.4995 21.4597C16.3244 21.4595 16.1163 21.2931 15.7002 20.9602L13.3148 19.0518C12.8275 18.662 12.5838 18.4671 12.3125 18.3285C12.0718 18.2055 11.8156 18.1156 11.5508 18.0613C11.2523 18 10.9403 18 10.3163 18H7.8C6.11984 18 5.27976 18 4.63803 17.673C4.07354 17.3854 3.6146 16.9265 3.32698 16.362C3 15.7202 3 14.8802 3 13.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V14C21 14.93 21 15.395 20.8978 15.7765C20.6204 16.8117 19.8117 17.6204 18.7765 17.8978C18.395 18 17.93 18 17 18ZM16 10.5C16 10.7761 16.2239 11 16.5 11C16.7761 11 17 10.7761 17 10.5C17 10.2239 16.7761 10 16.5 10C16.2239 10 16 10.2239 16 10.5ZM11.5 10.5C11.5 10.7761 11.7239 11 12 11C12.2761 11 12.5 10.7761 12.5 10.5C12.5 10.2239 12.2761 10 12 10C11.7239 10 11.5 10.2239 11.5 10.5ZM7 10.5C7 10.7761 7.22386 11 7.5 11C7.77614 11 8 10.7761 8 10.5C8 10.2239 7.77614 10 7.5 10C7.22386 10 7 10.2239 7 10.5Z'
			stroke={props.stroke || '#F7F8FA'}
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
export default CommunityIcon;
