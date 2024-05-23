import React from 'react'

interface HandShakeIconProps {
  type?: 'black' | 'white'
}

const HandShakeIcon = ({ type = 'black' }: HandShakeIconProps) => {
  return (
    <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_595_4552)">
        <path
          d="M22.9414 5.98403L19.368 0.175301C19.3151 0.0898308 19.2325 0.0296132 19.1377 0.0082457C19.0435 -0.0131218 18.9444 0.0063032 18.8625 0.0613408L16.993 1.33303C16.8236 1.44829 16.775 1.68657 16.8846 1.86463L17.0699 2.16572L16.4868 2.51084L12.6585 1.46642C12.5803 1.44505 12.4971 1.45217 12.4233 1.48519L11.1055 2.07766C11.1012 2.07507 11.0987 2.07054 11.0944 2.06795L9.74892 1.32915C9.66025 1.28058 9.5568 1.27152 9.46258 1.30584L6.0684 2.51084L5.25988 2.15083L5.39104 1.83484C5.4711 1.64254 5.3892 1.41785 5.20693 1.33109L3.17978 0.361781C3.09049 0.319046 2.98827 0.315808 2.89775 0.352716C2.806 0.389624 2.73272 0.463439 2.69331 0.557974L0.0306789 6.98442C-0.0493725 7.17672 0.0325262 7.40141 0.214797 7.48817L2.24133 8.45683C2.28936 8.4795 2.34109 8.49115 2.39281 8.49115C2.43715 8.49115 2.48148 8.48273 2.52397 8.46525C2.61572 8.42834 2.689 8.35453 2.72841 8.25999L2.91315 7.81451L3.79063 8.38561L4.72846 9.45463L4.50432 9.79198C4.16749 10.3003 4.33806 10.9549 4.91813 11.3848C5.12934 11.5415 5.35102 11.6393 5.56839 11.6769C5.56593 11.7494 5.569 11.8232 5.58194 11.8964C5.64043 12.2266 5.85288 12.5367 6.18109 12.7705C6.44341 12.957 6.72174 13.056 6.98591 13.056C7.01239 13.056 7.03641 13.0489 7.06227 13.047C7.14417 13.3396 7.32706 13.6129 7.57768 13.7909C7.85909 13.991 8.15343 14.0966 8.42869 14.0966C8.50135 14.0966 8.57093 14.0869 8.63805 14.0726C8.73658 14.3206 8.90345 14.5485 9.11097 14.7059C9.36221 14.8956 9.65594 15.0005 9.93858 15.0005C10.268 15.0005 10.5544 14.8548 10.7225 14.601L10.9368 14.2792L11.4331 14.6579C11.6702 14.8425 11.9799 14.9467 12.289 14.9467C12.6523 14.9467 13.015 14.803 13.2607 14.476C13.4085 14.2798 13.5033 14.0545 13.5384 13.8272C13.6536 13.844 13.7724 13.8434 13.8913 13.8246C14.2189 13.7735 14.5083 13.5909 14.7059 13.3105C14.8611 13.0897 14.9406 12.8346 14.9486 12.5788C15.036 12.5847 15.1271 12.5814 15.2183 12.5672C15.5459 12.516 15.8353 12.3334 16.0323 12.0531C16.1844 11.8374 16.2676 11.5843 16.2756 11.3214C16.3636 11.3279 16.4548 11.324 16.5447 11.3097C16.8723 11.2586 17.1617 11.076 17.3593 10.7956C17.5496 10.525 17.621 10.1908 17.5687 9.84961C18.0841 9.64046 19.1882 9.01886 19.8797 7.35932L20.1716 7.20586L20.4586 7.67271C20.5115 7.75818 20.594 7.8184 20.6889 7.83977C20.7141 7.84559 20.74 7.84818 20.7658 7.84818C20.8354 7.84818 20.905 7.82682 20.9647 7.78667L22.8342 6.51498C23.0036 6.39972 23.0522 6.16144 22.9426 5.98338L22.9414 5.98403ZM2.20561 7.59501L0.84474 6.94427L3.21549 1.22425L4.57637 1.87499L2.43284 7.04658C2.43284 7.04658 2.43099 7.04787 2.43037 7.04917C2.42668 7.05564 2.42668 7.06276 2.4236 7.06924L2.20561 7.59501ZM5.10409 10.2323L5.96926 8.92951C6.0567 8.79807 6.22912 8.7508 6.36151 8.7508C6.45942 8.7508 6.5524 8.7754 6.60906 8.8162C6.74268 8.91332 6.83505 9.05771 6.86214 9.21311C6.87692 9.29794 6.87815 9.42355 6.80241 9.53881L6.76731 9.5919L5.93786 10.8409C5.92431 10.8617 5.88244 10.9245 5.75805 10.9245C5.63366 10.9245 5.48772 10.8642 5.34055 10.7555C5.27528 10.7069 4.95753 10.455 5.10532 10.2316L5.10409 10.2323ZM6.59058 12.1333C6.42863 12.0174 6.32272 11.8802 6.30055 11.7558C6.28947 11.695 6.30055 11.6412 6.33319 11.592L7.36092 10.0413L7.40157 9.97976C7.48901 9.84831 7.66142 9.80169 7.79382 9.80169C7.89234 9.80169 7.98471 9.8263 8.04136 9.86709C8.17498 9.96357 8.26735 10.1086 8.29445 10.264C8.30923 10.3488 8.31046 10.4744 8.2341 10.5897L7.16511 12.202C7.15094 12.2227 7.10907 12.2868 6.98468 12.2868C6.86892 12.2868 6.72913 12.2324 6.58997 12.1333H6.59058ZM7.98656 13.1532C7.86525 13.067 7.77165 12.9246 7.74763 12.7906C7.74024 12.7465 7.73655 12.685 7.76488 12.6416L7.80182 12.5859L8.62943 11.3395C8.71687 11.2081 8.88929 11.1608 9.02168 11.1608C9.11959 11.1608 9.21257 11.1854 9.26923 11.2262C9.40285 11.3227 9.49522 11.4677 9.52231 11.6231C9.53709 11.7079 9.53832 11.8335 9.46258 11.9482L8.68793 13.1104C8.68423 13.1156 8.683 13.1214 8.67992 13.1266L8.59679 13.2516C8.58325 13.2723 8.5463 13.3273 8.42684 13.3273C8.29999 13.3273 8.14358 13.2658 7.98532 13.1532H7.98656ZM10.1215 14.16C10.079 14.2241 9.97861 14.2306 9.93735 14.2306C9.80865 14.2306 9.66271 14.1762 9.53709 14.081C9.33573 13.9289 9.23782 13.6517 9.28585 13.5591L10.063 12.3891C10.1504 12.2577 10.3228 12.2104 10.4552 12.2104C10.5531 12.2104 10.6461 12.235 10.7028 12.2758C10.8364 12.3723 10.9288 12.5173 10.9552 12.6727C10.97 12.7575 10.9719 12.8831 10.8955 12.9978L10.1208 14.16H10.1215ZM16.77 10.3391C16.6894 10.4544 16.5705 10.5288 16.4357 10.5502C16.3002 10.5716 16.1672 10.536 16.0576 10.4505L15.7737 10.2297C15.7737 10.2297 15.7731 10.229 15.7725 10.2284C15.6105 10.1021 15.3815 10.1377 15.2608 10.3087C15.1407 10.4796 15.1746 10.7205 15.3371 10.8468C15.4461 10.9316 15.5175 11.0565 15.5373 11.1977C15.5576 11.3395 15.5237 11.4807 15.443 11.5953C15.3624 11.7099 15.2435 11.785 15.1087 11.8064C14.9744 11.8284 14.8396 11.7921 14.7306 11.7073L14.4473 11.4865C14.4473 11.4865 14.4461 11.4858 14.4455 11.4852C14.2829 11.3589 14.0538 11.3945 13.9338 11.5655C13.8137 11.7364 13.8476 11.9773 14.0101 12.1036C14.2361 12.2797 14.2835 12.6157 14.116 12.8527C14.0354 12.9673 13.9165 13.0424 13.7817 13.0638C13.6474 13.0845 13.5126 13.0496 13.4036 12.9647L13.1191 12.7426C12.9571 12.6157 12.7281 12.652 12.6074 12.8229C12.4873 12.9932 12.5212 13.2341 12.6837 13.361C12.7625 13.4225 12.8063 13.4957 12.8174 13.5863C12.8334 13.7139 12.7841 13.868 12.6856 13.9994C12.5236 14.2151 12.1178 14.2351 11.8641 14.0376L11.3549 13.6498L11.4953 13.4394C11.6671 13.1797 11.7311 12.8592 11.6751 12.5361C11.6135 12.1806 11.4103 11.8549 11.1172 11.6432C10.938 11.5137 10.7028 11.4425 10.4552 11.4425C10.3807 11.4425 10.3074 11.4509 10.236 11.4632C10.1695 11.1168 9.9706 10.8008 9.68426 10.5936C9.50753 10.4654 9.27538 10.3948 9.03092 10.3929C9.03338 10.3048 9.02907 10.2161 9.01368 10.1267C8.9521 9.77061 8.74828 9.44492 8.45516 9.23319C8.27597 9.10369 8.04074 9.03246 7.7932 9.03246C7.71869 9.03246 7.64603 9.04088 7.5746 9.05318C7.5081 8.70677 7.3092 8.39079 7.02286 8.18359C6.84367 8.05409 6.60844 7.98286 6.3609 7.98286C5.95017 7.98286 5.57947 8.17258 5.36888 8.4905L5.15643 8.81037L4.29311 7.82682C4.27032 7.80092 4.24508 7.7789 4.21675 7.76077L3.20687 7.10356L4.96677 2.85725L5.91015 3.27748C5.95571 3.29755 6.00436 3.30791 6.05301 3.30791C6.09242 3.30791 6.13183 3.30143 6.17001 3.28784L9.54756 2.08867L10.2385 2.4681L9.60852 2.75106C9.56172 2.77243 9.51923 2.80351 9.48413 2.843L7.37693 5.22969C7.25686 5.36567 7.24639 5.57157 7.35107 5.7205C7.37262 5.75093 7.88742 6.46512 8.8702 6.46512C9.65286 6.46512 10.4879 6.01705 11.3567 5.13192L16.5822 9.53751C16.5952 9.55111 16.6038 9.56794 16.6186 9.58025C16.7343 9.67025 16.8168 9.80687 16.8445 9.95515C16.871 10.0976 16.8445 10.2342 16.7694 10.3411L16.77 10.3391ZM19.4308 6.73578C19.352 6.77722 19.2898 6.84779 19.2559 6.93391C18.6562 8.47302 17.6697 8.99296 17.2861 9.14254L11.5587 4.31348C11.4916 4.2565 11.4103 4.22865 11.3296 4.22865C11.2329 4.22865 11.1363 4.2688 11.0648 4.34779C10.2656 5.2284 9.50692 5.69395 8.87082 5.69395C8.55554 5.69395 8.31908 5.57999 8.16329 5.46927L9.96814 3.42446L12.5957 2.24342L16.4455 3.29366C16.5367 3.31892 16.634 3.30532 16.7165 3.25676L17.4671 2.81257L19.7707 6.55707L19.4308 6.73578ZM20.8736 6.93262L20.6839 6.62441C20.6753 6.5752 20.6587 6.52793 20.6322 6.48519L17.9074 2.08284C17.8932 2.05953 17.8729 2.04464 17.855 2.02586L17.6974 1.76945L18.9524 0.915394L22.1286 6.07856L20.8736 6.93262Z"
          fill={type}
        />
      </g>
      <defs>
        <clipPath id="clip0_595_4552">
          <rect width="23" height="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default HandShakeIcon