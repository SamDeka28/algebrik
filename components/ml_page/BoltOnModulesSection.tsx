"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const productAreas = [
  {
    id: "dao",
    name: "Account Opening (DAO)",
    icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1593_1937)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2.8C12.0411 2.79964 10.1163 3.31308 8.41781 4.28908C6.71932 5.26507 5.30652 6.66949 4.32043 8.36213C3.33434 10.0548 2.80945 11.9765 2.79815 13.9354C2.78684 15.8943 3.28952 17.8219 4.25601 19.5258C4.90926 18.6768 5.74901 17.9894 6.71033 17.5168C7.67165 17.0441 8.72878 16.7989 9.80001 16.8H18.2C19.2712 16.7989 20.3284 17.0441 21.2897 17.5168C22.251 17.9894 23.0907 18.6768 23.744 19.5258C24.7105 17.8219 25.2132 15.8943 25.2019 13.9354C25.1906 11.9765 24.6657 10.0548 23.6796 8.36213C22.6935 6.66949 21.2807 5.26507 19.5822 4.28908C17.8837 3.31308 15.9589 2.79964 14 2.8ZM25.1202 22.5064C25.2957 22.2777 25.4637 22.0435 25.6242 21.8036C27.1763 19.4974 28.0036 16.7799 28 14C28 6.2678 21.7322 0 14 0C6.26781 0 1.43576e-05 6.2678 1.43576e-05 14C-0.00439749 17.0755 1.00807 20.0661 2.87981 22.5064L2.87281 22.5316L3.36981 23.1098C4.68285 24.6449 6.31315 25.8771 8.14833 26.7213C9.98352 27.5655 11.9799 28.0018 14 28C14.3024 28 14.6029 27.9907 14.9016 27.972C17.4278 27.8127 19.8628 26.9681 21.945 25.529C22.9408 24.842 23.8434 24.0288 24.6302 23.1098L25.1272 22.5316L25.1202 22.5064Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2.8C12.0411 2.79964 10.1163 3.31308 8.41781 4.28908C6.71932 5.26507 5.30652 6.66949 4.32043 8.36213C3.33434 10.0548 2.80945 11.9765 2.79815 13.9354C2.78684 15.8943 3.28952 17.8219 4.25601 19.5258C4.90926 18.6768 5.74901 17.9894 6.71033 17.5168C7.67165 17.0441 8.72878 16.7989 9.80001 16.8H18.2C19.2712 16.7989 20.3284 17.0441 21.2897 17.5168C22.251 17.9894 23.0907 18.6768 23.744 19.5258C24.7105 17.8219 25.2132 15.8943 25.2019 13.9354C25.1906 11.9765 24.6657 10.0548 23.6796 8.36213C22.6935 6.66949 21.2807 5.26507 19.5822 4.28908C17.8837 3.31308 15.9589 2.79964 14 2.8ZM25.1202 22.5064C25.2957 22.2777 25.4637 22.0435 25.6242 21.8036C27.1763 19.4974 28.0036 16.7799 28 14C28 6.2678 21.7322 0 14 0C6.26781 0 1.43576e-05 6.2678 1.43576e-05 14C-0.00439749 17.0755 1.00807 20.0661 2.87981 22.5064L2.87281 22.5316L3.36981 23.1098C4.68285 24.6449 6.31315 25.8771 8.14833 26.7213C9.98352 27.5655 11.9799 28.0018 14 28C14.3024 28 14.6029 27.9907 14.9016 27.972C17.4278 27.8127 19.8628 26.9681 21.945 25.529C22.9408 24.842 23.8434 24.0288 24.6302 23.1098L25.1272 22.5316L25.1202 22.5064Z" fill="url(#paint0_radial_1593_1937)"/>
    <path d="M11.027 6.83016C11.8147 6.04251 12.883 5.60001 13.9969 5.60001C15.1108 5.60001 16.1791 6.04251 16.9667 6.83016C17.7544 7.61781 18.1969 8.6861 18.1969 9.80001C18.1969 10.9139 17.7544 11.9822 16.9667 12.7699C16.1791 13.5575 15.1108 14 13.9969 14C12.883 14 11.8147 13.5575 11.027 12.7699C10.2394 11.9822 9.79688 10.9139 9.79688 9.80001C9.79688 8.6861 10.2394 7.61781 11.027 6.83016Z" fill="#15C3A9"/>
    </g>
    <defs>
    <radialGradient id="paint0_radial_1593_1937" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-10.4453 -21.3555) rotate(56.6599) scale(55.8708 42.6904)">
    <stop stop-color="#7EB2FF"/>
    <stop offset="1" stop-color="#043071"/>
    </radialGradient>
    <clipPath id="clip0_1593_1937">
    <rect width="28" height="28" fill="white"/>
    </clipPath>
    </defs>
    </svg>    
    ,
    description: "From disconnected add-on to embedded onboarding"
  },
  {
    id: "pos",
    name: "POS (Omnichannel)",
    icon: <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.4603 2.148C23.5223 2.148 22.6227 2.52413 21.9594 3.19363C21.2961 3.86314 20.9235 4.77118 20.9235 5.718C20.9235 6.2278 21.0339 6.71189 21.2263 7.15314L18.4604 10.2933C17.52 9.64056 16.4059 9.29012 15.2646 9.288C14.2177 9.288 13.25 9.59645 12.4082 10.0963L9.19109 6.85041L9.15855 6.88325C9.43584 6.31491 9.60561 5.6823 9.60561 5.004C9.60561 4.15671 9.35669 3.32844 8.89033 2.62394C8.42397 1.91944 7.76112 1.37035 6.98559 1.0461C6.21006 0.721857 5.35669 0.63702 4.5334 0.802319C3.7101 0.967618 2.95385 1.37563 2.36029 1.97476C1.76673 2.57389 1.3625 3.33722 1.19874 4.16824C1.03498 4.99925 1.11903 5.86062 1.44026 6.64342C1.76149 7.42622 2.30549 8.09529 3.00344 8.56602C3.7014 9.03675 4.52197 9.288 5.3614 9.288C6.0334 9.288 6.65871 9.11664 7.22319 8.83675L7.19065 8.8696L10.4078 12.1154C9.88831 12.9867 9.61119 13.9832 9.60561 15C9.60561 16.4237 10.1432 17.7118 10.9991 18.7142L7.35335 22.3928C6.94446 22.2286 6.50881 22.1429 6.06877 22.14C4.11926 22.14 2.53193 23.7408 2.53193 25.71C2.53193 27.6792 4.11926 29.28 6.06877 29.28C8.01827 29.28 9.60561 27.6792 9.60561 25.71C9.60561 25.2516 9.51224 24.8161 9.3552 24.4119L13.3702 20.3593C13.9658 20.5735 14.5968 20.712 15.2646 20.712C18.3855 20.712 20.9235 18.1502 20.9235 15C20.9235 14.0918 20.6929 13.245 20.318 12.481L23.313 9.07809C23.6752 9.20375 24.0571 9.288 24.4603 9.288C26.4113 9.288 27.9972 7.68721 27.9972 5.718C27.9972 3.74879 26.4113 2.148 24.4603 2.148ZM15.2646 17.856C13.7041 17.856 12.4351 16.5751 12.4351 15C12.4351 13.4249 13.7041 12.144 15.2646 12.144C16.825 12.144 18.094 13.4249 18.094 15C18.094 16.5751 16.825 17.856 15.2646 17.856Z" fill="black"/>
    <path d="M24.4603 2.148C23.5223 2.148 22.6227 2.52413 21.9594 3.19363C21.2961 3.86314 20.9235 4.77118 20.9235 5.718C20.9235 6.2278 21.0339 6.71189 21.2263 7.15314L18.4604 10.2933C17.52 9.64056 16.4059 9.29012 15.2646 9.288C14.2177 9.288 13.25 9.59645 12.4082 10.0963L9.19109 6.85041L9.15855 6.88325C9.43584 6.31491 9.60561 5.6823 9.60561 5.004C9.60561 4.15671 9.35669 3.32844 8.89033 2.62394C8.42397 1.91944 7.76112 1.37035 6.98559 1.0461C6.21006 0.721857 5.35669 0.63702 4.5334 0.802319C3.7101 0.967618 2.95385 1.37563 2.36029 1.97476C1.76673 2.57389 1.3625 3.33722 1.19874 4.16824C1.03498 4.99925 1.11903 5.86062 1.44026 6.64342C1.76149 7.42622 2.30549 8.09529 3.00344 8.56602C3.7014 9.03675 4.52197 9.288 5.3614 9.288C6.0334 9.288 6.65871 9.11664 7.22319 8.83675L7.19065 8.8696L10.4078 12.1154C9.88831 12.9867 9.61119 13.9832 9.60561 15C9.60561 16.4237 10.1432 17.7118 10.9991 18.7142L7.35335 22.3928C6.94446 22.2286 6.50881 22.1429 6.06877 22.14C4.11926 22.14 2.53193 23.7408 2.53193 25.71C2.53193 27.6792 4.11926 29.28 6.06877 29.28C8.01827 29.28 9.60561 27.6792 9.60561 25.71C9.60561 25.2516 9.51224 24.8161 9.3552 24.4119L13.3702 20.3593C13.9658 20.5735 14.5968 20.712 15.2646 20.712C18.3855 20.712 20.9235 18.1502 20.9235 15C20.9235 14.0918 20.6929 13.245 20.318 12.481L23.313 9.07809C23.6752 9.20375 24.0571 9.288 24.4603 9.288C26.4113 9.288 27.9972 7.68721 27.9972 5.718C27.9972 3.74879 26.4113 2.148 24.4603 2.148ZM15.2646 17.856C13.7041 17.856 12.4351 16.5751 12.4351 15C12.4351 13.4249 13.7041 12.144 15.2646 12.144C16.825 12.144 18.094 13.4249 18.094 15C18.094 16.5751 16.825 17.856 15.2646 17.856Z" fill="url(#paint0_radial_1593_1980)"/>
    <circle cx="15" cy="14.75" r="6" fill="#15C3A9"/>
    <defs>
    <radialGradient id="paint0_radial_1593_1980" cx="0" cy="0" r="1" gradientTransform="matrix(29.4788 47.6093 -34.238 23.9323 -8.91031 -21.0626)" gradientUnits="userSpaceOnUse">
    <stop stop-color="#7EB2FF"/>
    <stop offset="1" stop-color="#043071"/>
    </radialGradient>
    </defs>
    </svg>
    
  },
  {
    id: "los",
    name: "Loan Origination (LOS)",
    icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.22222 15.4722H11.5556C12.2278 15.4722 12.7778 14.9222 12.7778 14.25V4.47222C12.7778 3.8 12.2278 3.25 11.5556 3.25H4.22222C3.55 3.25 3 3.8 3 4.47222V14.25C3 14.9222 3.55 15.4722 4.22222 15.4722ZM4.22222 25.25H11.5556C12.2278 25.25 12.7778 24.7 12.7778 24.0278V19.1389C12.7778 18.4667 12.2278 17.9167 11.5556 17.9167H4.22222C3.55 17.9167 3 18.4667 3 19.1389V24.0278C3 24.7 3.55 25.25 4.22222 25.25ZM15.2222 4.47222V9.36111C15.2222 10.0333 15.7722 10.5833 16.4444 10.5833H23.7778C24.45 10.5833 25 10.0333 25 9.36111V4.47222C25 3.8 24.45 3.25 23.7778 3.25H16.4444C15.7722 3.25 15.2222 3.8 15.2222 4.47222Z" fill="black"/>
    <path d="M4.22222 15.4722H11.5556C12.2278 15.4722 12.7778 14.9222 12.7778 14.25V4.47222C12.7778 3.8 12.2278 3.25 11.5556 3.25H4.22222C3.55 3.25 3 3.8 3 4.47222V14.25C3 14.9222 3.55 15.4722 4.22222 15.4722ZM4.22222 25.25H11.5556C12.2278 25.25 12.7778 24.7 12.7778 24.0278V19.1389C12.7778 18.4667 12.2278 17.9167 11.5556 17.9167H4.22222C3.55 17.9167 3 18.4667 3 19.1389V24.0278C3 24.7 3.55 25.25 4.22222 25.25ZM15.2222 4.47222V9.36111C15.2222 10.0333 15.7722 10.5833 16.4444 10.5833H23.7778C24.45 10.5833 25 10.0333 25 9.36111V4.47222C25 3.8 24.45 3.25 23.7778 3.25H16.4444C15.7722 3.25 15.2222 3.8 15.2222 4.47222Z" fill="url(#paint0_radial_1593_1947)"/>
    <path d="M23.7743 25.25H16.441C15.7688 25.25 15.2188 24.7 15.2188 24.0278V14.25C15.2188 13.5778 15.7688 13.0278 16.441 13.0278H23.7743C24.4465 13.0278 24.9965 13.5778 24.9965 14.25V24.0278C24.9965 24.7 24.4465 25.25 23.7743 25.25Z" fill="#15C3A9"/>
    <defs>
    <radialGradient id="paint0_radial_1593_1947" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-5.20703 -13.5293) rotate(56.6599) scale(43.8985 33.5425)">
    <stop stop-color="#7EB2FF"/>
    <stop offset="1" stop-color="#043071"/>
    </radialGradient>
    </defs>
    </svg>
    
  },
  {
    id: "ai",
    name: "AI Decision Engine",
    icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1593_1950)">
    <path d="M11.3593 15.7227C9.98984 14.5634 8.24068 13.958 6.42373 13.9193V17.7837L1 12.6312L6.42373 7.47868V11.3431C8.68814 11.3431 10.8983 12.0773 12.7017 13.3912C12.1502 14.1101 11.699 14.8937 11.3593 15.7227ZM13.2034 12.7858C13.9898 11.9356 14.8983 11.2014 15.9153 10.6088V4.90242H19.9831L14.5593 -0.250092L9.1356 4.90242H13.2034V12.7858Z" fill="#2A5FAC"/>
    <path d="M22.1512 14.1316V18.2048L27.575 12.7739L22.1512 7.34309V11.4162C19.8013 11.3387 17.5118 12.1698 15.7572 13.737C14.0027 15.3042 12.9178 17.4874 12.7275 19.834C11.575 20.2413 10.6258 21.151 10.2462 22.3186C9.50042 24.4366 10.6258 26.7583 12.7275 27.5186C13.7453 27.877 14.8635 27.8167 15.837 27.351C16.8104 26.8853 17.5598 26.0521 17.9207 25.034C18.6665 22.916 17.5546 20.5807 15.4394 19.834C16.0496 14.3489 21.4733 14.1316 22.1512 14.1316Z" fill="#15C3A9"/>
    </g>
    <defs>
    <clipPath id="clip0_1593_1950">
    <rect width="28" height="28" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
  },
  {
    id: "analytics",
    name: "Portfolio Analytics",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6104 1.6104C0 3.223 0 5.8146 0 11C0 16.1854 0 18.7781 1.6104 20.3885C3.223 22 5.8146 22 11 22C16.1854 22 18.7781 22 20.3885 20.3885C22 18.7792 22 16.1854 22 11C22 5.8146 22 3.2219 20.3885 1.6104C18.7792 0 16.1854 0 11 0C5.8146 0 3.2219 0 1.6104 1.6104Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6104 1.6104C0 3.223 0 5.8146 0 11C0 16.1854 0 18.7781 1.6104 20.3885C3.223 22 5.8146 22 11 22C16.1854 22 18.7781 22 20.3885 20.3885C22 18.7792 22 16.1854 22 11C22 5.8146 22 3.2219 20.3885 1.6104C18.7792 0 16.1854 0 11 0C5.8146 0 3.2219 0 1.6104 1.6104Z" fill="url(#paint0_radial_1202_5)"/>
    <path d="M13.5956 9.61472C13.1402 9.61472 12.7706 9.24512 12.7706 8.78972C12.7706 8.57092 12.8575 8.36108 13.0122 8.20636C13.1669 8.05164 13.3768 7.96472 13.5956 7.96472H16.3456C16.5644 7.96472 16.7742 8.05164 16.9289 8.20636C17.0837 8.36108 17.1706 8.57092 17.1706 8.78972V11.5397C17.1706 11.7585 17.0837 11.9684 16.9289 12.1231C16.7742 12.2778 16.5644 12.3647 16.3456 12.3647C16.1268 12.3647 15.9169 12.2778 15.7622 12.1231C15.6075 11.9684 15.5206 11.7585 15.5206 11.5397V10.7818L13.3063 12.995C12.9453 13.3557 12.4559 13.5584 11.9456 13.5584C11.4353 13.5584 10.9458 13.3557 10.5849 12.995L8.84028 11.2504C8.81473 11.2248 8.78439 11.2045 8.75098 11.1906C8.71757 11.1768 8.68175 11.1696 8.64558 11.1696C8.60941 11.1696 8.57359 11.1768 8.54018 11.1906C8.50677 11.2045 8.47642 11.2248 8.45088 11.2504L5.92858 13.7727C5.85305 13.8538 5.76197 13.9188 5.66077 13.9639C5.55957 14.009 5.45033 14.0332 5.33955 14.0352C5.22878 14.0371 5.11875 14.0167 5.01602 13.9753C4.91329 13.9338 4.81998 13.872 4.74164 13.7937C4.6633 13.7153 4.60154 13.622 4.56004 13.5193C4.51855 13.4166 4.49817 13.3065 4.50013 13.1957C4.50208 13.085 4.52633 12.9757 4.57142 12.8745C4.61651 12.7733 4.68152 12.6823 4.76258 12.6067L7.28488 10.0844C7.64585 9.72371 8.13527 9.52108 8.64558 9.52108C9.15589 9.52108 9.64531 9.72371 10.0063 10.0844L11.7509 11.829C11.7764 11.8546 11.8068 11.8749 11.8402 11.8888C11.8736 11.9027 11.9094 11.9098 11.9456 11.9098C11.9818 11.9098 12.0176 11.9027 12.051 11.8888C12.0844 11.8749 12.1147 11.8546 12.1403 11.829L14.3546 9.61472H13.5956Z" fill="#F5F7FE"/>
    <defs>
    <radialGradient id="paint0_radial_1202_5" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-8.20703 -16.7793) rotate(56.6599) scale(43.8985 33.5425)">
    <stop stop-color="#7EB2FF"/>
    <stop offset="1" stop-color="#043071"/>
    </radialGradient>
    </defs>
    </svg>
    
  }
];

const comparisonData = {
  dao: {
    title: "Account Opening (DAO)",
    legacy: [
      "Separate DAO module, sold apart from lending",
      "Limited integration + borrower has to re-enter data",
      "Adds vendor cost and slows time-to-fund"
    ],
    algebrik: [
      "Embedded account opening within the lending journey",
      "One seamless borrower flow from deposit to loan approval",
      "Eliminates re-entry, reducing drop-offs and abandonment"
    ]
  },
  pos: {
    title: "POS (Omnichannel)",
    legacy: [
      "Multiple disconnected systems",
      "Inconsistent user experience",
      "Complex integration requirements"
    ],
    algebrik: [
      "Unified omnichannel experience",
      "Consistent interface across all touchpoints",
      "Seamless integration with core platform"
    ]
  },
  los: {
    title: "Loan Origination (LOS)",
    legacy: [
      "Siloed loan processing systems",
      "Manual workflow management",
      "Limited customization options"
    ],
    algebrik: [
      "Integrated loan origination workflow",
      "Automated workflow management",
      "Flexible customization capabilities"
    ]
  },
  ai: {
    title: "AI Decision Engine",
    legacy: [
      "Rule-based decision making",
      "Limited machine learning capabilities",
      "External vendor dependencies"
    ],
    algebrik: [
      "Advanced AI-powered decisioning",
      "Continuous learning and optimization",
      "Native AI capabilities built-in"
    ]
  },
  analytics: {
    title: "Portfolio Analytics",
    legacy: [
      "Separate analytics tools",
      "Limited real-time insights",
      "Complex reporting setup"
    ],
    algebrik: [
      "Integrated portfolio analytics",
      "Real-time insights and monitoring",
      "Simplified reporting and dashboards"
    ]
  }
};

export default function BoltOnModulesSection() {
  const [selectedArea, setSelectedArea] = useState("dao");

  return (
    <section className="py-20 font-plus-jakarta">
      <div className="container relative opacity-[30%] -z-20">
        <motion.div
          className="absolute top-20 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[861.73px] md:h-[239.68px] blur-[100px]"
          animate={{
            y: [50, 30, 50],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10"
          animate={{
            y: [50, 30, 60],
          }}
          transition={{
            duration: 2,
            delay: 0.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1]"
          animate={{
            y: [10, 90, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2a5fac] mb-6 font-plus-jakarta">
            From Bolt-On Modules to a Unified Stack
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-plus-jakarta">
            How Algebrik reimagines each layer of the lending experience compared to legacy LOS providers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3">
          {/* Left Side - Navigation */}
          <div className="space-y-2 flex flex-col justify-center">
            {productAreas.map((area, index) => (
              <div
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`flex items-center gap-4 p-4 rounded-l-full transition-all cursor-pointer ${selectedArea === area.id
                  ? 'bg-gray-50 shadow-lg'
                  : 'bg-transparent hover:shadow-md'
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center p-2 ${selectedArea === area.id && 'bg-[#EFF6FC]'}`}>
                    {area.icon}
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium font-plus-jakarta text-lg ${selectedArea === area.id ? 'text-[#2a5fac] !font-bold' : 'text-gray-700'
                    }`}>
                    {area.name}
                  </span>
                  {area.description && (
                    <span className="text-xs text-gray-500 font-plus-jakarta">
                      {area.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 col-span-2 h-full">
            <div className="!bg-gray-50 rounded-[40px] p-[28px] shadow-sm h-[456px]">

              <div className="grid md:grid-cols-2 gap-8">
                {/* Legacy LOS */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-800 mb-4 font-plus-jakarta bg-[#F0F0F0] rounded-[40px] px-4 py-2">Legacy LOS</h5>
                  <ul className="space-y-3">
                    {comparisonData[selectedArea as keyof typeof comparisonData].legacy.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Image src="/icons/info-circle.svg" alt="Info" width={20} height={20} className="flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 font-plus-jakarta">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Algebrik */}
                <div>
                  <div className="flex items-center gap-2 mb-4 bg-[#EFF6FC] rounded-full px-4 py-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#2A5FAC" />
                      <path d="M7.75 12L10.58 14.83L16.25 9.17001" stroke="#EFF6FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <h5 className="text-lg font-semibold text-[#2a5fac] font-plus-jakarta">Algebrik</h5>
                  </div>
                  <ul className="space-y-3">
                    {comparisonData[selectedArea as keyof typeof comparisonData].algebrik.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Image src="/icons/tick-circle.svg" alt="Tick" width={20} height={20} className="flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 font-plus-jakarta">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
