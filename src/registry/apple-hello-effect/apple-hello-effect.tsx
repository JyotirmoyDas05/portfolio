"use client";

import type { TargetAndTransition } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
};

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

function AppleHelloHindiEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 605 273"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>नमस्ते</title>

      {/* न - first loop */}
      <motion.path
        d="M42.3842 150.002C53.2928 153.473 60.4984 162.29 60.4984 175.561C60.4984 189.953 50.3247 201.119 36.677 201.119C24.022 201.119 14.8408 192.186 14.8408 179.035C14.8408 160.269 31.2182 148.265 56.5282 149.01C82.0863 149.754 103.723 163.663 120.367 185.069"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          opacity: { duration: 0.3 },
        }}
      />

      {/* न - vertical stem */}
      <motion.path
        d="M133.502 93.5842C124.459 153.875 117.303 209.683 111.71 264.988"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeInOut",
          delay: calc(0.5),
          opacity: { duration: 0.25, delay: calc(0.5) },
        }}
      />

      {/* म - loop and curve */}
      <motion.path
        d="M216.556 90.9181C217.117 117.977 216.81 137.689 214.869 160.067C212.007 193.058 200.119 213.115 180.936 213.115C169.295 213.115 160.844 205.334 160.844 193.399C160.844 177.222 175.901 164.28 203.653 165.376C229.863 166.411 256.651 174.863 275.138 192.025"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeInOut",
          delay: calc(0.9),
          opacity: { duration: 0.35, delay: calc(0.9) },
        }}
      />

      {/* म - vertical stem */}
      <motion.path
        d="M289.489 90.0085C280.255 150.162 272.672 207.783 267.379 263.003"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeInOut",
          delay: calc(1.5),
          opacity: { duration: 0.25, delay: calc(1.5) },
        }}
      />

      {/* स्त - complex loop */}
      <motion.path
        d="M373.949 90.0198C394.816 102.051 408.098 128.602 408.098 154.079C408.098 185.141 387.465 205.586 358.47 205.586C330.249 205.586 311.145 186.038 317.527 170.35C322.864 157.231 341.378 156.812 356.237 168.861C374.674 183.811 382.044 216.764 385.021 261.169"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(1.9),
          opacity: { duration: 0.4, delay: calc(1.9) },
        }}
      />

      {/* Halant mark (virama) */}
      <motion.path
        d="M403.474 177.549C418.085 183.32 439.163 184.314 458.424 179.805"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.3),
          ease: "easeOut",
          delay: calc(2.6),
          opacity: { duration: 0.15, delay: calc(2.6) },
        }}
      />

      {/* त - vertical stem */}
      <motion.path
        d="M556.981 88.1333C546.807 149.619 538.371 207.01 531.919 262.906"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeInOut",
          delay: calc(2.8),
          opacity: { duration: 0.25, delay: calc(2.8) },
        }}
      />

      {/* त - matra loop */}
      <motion.path
        d="M536.891 222.462C541.984 183.336 528.689 152.484 496.435 152.484C472.365 152.484 453.755 175.064 453.755 203.104C453.755 223.451 461.199 245.784 475.095 261.417"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          delay: calc(3.2),
          opacity: { duration: 0.3, delay: calc(3.2) },
        }}
      />

      {/* त े - Chandrabindu / accent mark */}
      <motion.path
        className="stroke-yellow-400"
        d="M521.259 45.4307C485.619 43.0134 474.856 32.3917 474.856 21.5298C474.856 12.832 482.71 7.04349 493.506 7.46568C518.289 8.37031 542.96 35.3336 555.578 70.4412"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeInOut",
          delay: calc(3.7),
          opacity: { duration: 0.25, delay: calc(3.7) },
        }}
      />

      {/* Shirorekha (headline) - the connecting line */}
      <motion.path
        d="M7.44434 88.6792C30.9102 88.8706 59.0093 89.2085 95.3706 89.2085C132.178 89.2085 208.165 89.2571 253.623 89.2047C295.091 89.1568 396.683 89.0223 452.784 89.0234C506.182 89.0244 552.847 88.4444 596.931 87.2836"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeOut",
          delay: calc(4.1),
          opacity: { duration: 0.4, delay: calc(4.1) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloEnglishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 638 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>hello</title>

      {/* h1 */}
      <motion.path
        d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          opacity: { duration: 0.4 },
        }}
      />

      {/* h2, ello */}
      <motion.path
        d="M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(2.8),
          ease: "easeInOut",
          delay: calc(0.7),
          opacity: { duration: 0.7, delay: calc(0.7) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloArabicEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 558 226"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>مرحبا</title>

      {/* First curve - م */}
      <motion.path
        d="M512.414 176.427C488.345 173.946 475.938 155.829 475.938 134.988C475.938 112.599 492.067 94.7893 513.655 94.7893C537.476 94.7893 550.38 111.911 550.38 132.506C550.38 160.298 530.528 176.923 495.4 179.166C441.975 182.576 399.187 148.726 388.097 95.0375"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          opacity: { duration: 0.4 },
        }}
      />

      {/* ر - connecting curve */}
      <motion.path
        d="M388.097 95.0375C392.315 120.348 394.3 138.214 392.811 160.794C390.826 197.023 365.764 218.363 334.747 218.363C329.04 218.363 323.829 217.618 318.37 216.129"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          delay: calc(0.7),
          opacity: { duration: 0.3, delay: calc(0.7) },
        }}
      />

      {/* ح ب - middle section */}
      <motion.path
        d="M182.886 204.467C166.757 143.176 184.126 104.963 218.121 104.963C236.065 104.963 249.328 114.277 265.02 133.003C281.987 153.251 295.171 161.042 309.092 161.042C326.723 161.042 325.566 147.147 305.715 146.402C274.697 145.41 230.032 181.886 173.702 181.886C135.329 181.886 115.031 157.694 111.174 116.626"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(1.0),
          ease: "easeInOut",
          delay: calc(1.2),
          opacity: { duration: 0.5, delay: calc(1.2) },
        }}
      />

      {/* ا - final stroke */}
      <motion.path
        d="M111.174 116.626C115.392 161.042 98.0222 181.886 66.5893 181.886C40.6957 181.886 26.5992 158.747 20.6094 121.061C14.8956 85.1119 10.6773 45.6578 8.44403 7.4444"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(2.1),
          opacity: { duration: 0.4, delay: calc(2.1) },
        }}
      />

      {/* Diacritical mark 1 */}
      <motion.path
        className="stroke-yellow-400"
        d="M121.844 26.0548C107.451 29.7769 87.6003 35.7323 72.4639 41.4395"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.3),
          ease: "easeOut",
          delay: calc(2.8),
          opacity: { duration: 0.15, delay: calc(2.8) },
        }}
      />

      {/* Diacritical mark 2 */}
      <motion.path
        className="stroke-yellow-400"
        d="M128.791 54.839C114.151 58.5611 94.052 64.5164 79.1636 70.2236"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.3),
          ease: "easeOut",
          delay: calc(3.0),
          opacity: { duration: 0.15, delay: calc(3.0) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloBulgarianEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 942 275"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Здравейте</title>

      {/* З - first letter loop */}
      <motion.path
        d="M7.69214 129.434C12.1586 110.328 27.047 98.665 46.8981 98.665C64.516 98.665 78.6599 110.328 78.6599 130.427C78.6599 148.045 67.9899 161.196 41.9353 172.61"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.4),
          ease: "easeInOut",
          opacity: { duration: 0.2 },
        }}
      />

      {/* З - second part and д */}
      <motion.path
        d="M41.9352 172.61C58.8086 180.303 69.2304 198.417 67.7416 221.494C65.7565 250.03 52.357 267.399 35.7317 267.399C23.821 267.399 15.8806 258.715 16.1287 245.811C16.3768 229.682 28.2875 216.283 59.4088 207.186C100.815 195.083 124.914 172.982 131.289 139.623"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          delay: calc(0.35),
          opacity: { duration: 0.3, delay: calc(0.35) },
        }}
      />

      {/* р - loop */}
      <motion.path
        d="M205.631 114.151C201.661 105.218 192.059 96.928 175.186 96.928C150.372 96.928 129.528 121.246 130.025 154.496C130.025 173.355 142.183 186.571 156.806 186.571C182.83 186.571 200.025 160.517 205.027 119.148"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeInOut",
          delay: calc(0.85),
          opacity: { duration: 0.25, delay: calc(0.85) },
        }}
      />

      {/* а - with descender */}
      <motion.path
        d="M207.444 99.1615C202.812 137.469 198.18 175.776 193.548 214.083C188.834 252.15 177.419 267.425 160.049 267.425C148.172 267.425 140.481 258.792 140.967 245.921C141.585 229.594 153.815 216.257 186.164 207.026C231.624 194.054 267.571 166.731 275.925 121.77C277.322 114.255 278.995 106.683 280.184 99.1615"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeInOut",
          delay: calc(1.3),
          opacity: { duration: 0.35, delay: calc(1.3) },
        }}
      />

      {/* в - stem */}
      <motion.path
        d="M280.184 99.1613C271.947 151.27 265.452 203.628 259.944 255.737"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.4),
          ease: "easeInOut",
          delay: calc(1.9),
          opacity: { duration: 0.2, delay: calc(1.9) },
        }}
      />

      {/* е - loop */}
      <motion.path
        d="M269.521 173.718C275.854 124.702 297.866 97.1762 322.58 97.1762C342.112 97.4243 353.051 113.259 351.081 139.856C348.94 168.753 327.331 195.439 301.205 195.439C284.331 195.191 274.193 186.506 269.479 174.844"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeInOut",
          delay: calc(2.25),
          opacity: { duration: 0.25, delay: calc(2.25) },
        }}
      />

      {/* й connector */}
      <motion.path
        d="M295.19 194.962C346.74 202.662 402.494 177.424 413.702 138.13"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.4),
          ease: "easeInOut",
          delay: calc(2.7),
          opacity: { duration: 0.2, delay: calc(2.7) },
        }}
      />

      {/* т - complex curve */}
      <motion.path
        d="M491.96 115.929C487.096 104.734 476.756 97.1765 460.296 97.1765C433.001 97.1765 412.487 124.472 411.141 153.752C409.967 180.551 422.333 195.616 439.946 195.44C464.947 195.189 483.323 170.634 491.526 118.676C492.539 112.266 493.587 105.572 494.599 99.1617"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          delay: calc(3.05),
          opacity: { duration: 0.3, delay: calc(3.05) },
        }}
      />

      {/* е - large flowing section */}
      <motion.path
        d="M494.6 99.1613C493.575 105.664 492.55 112.166 491.526 118.669C487.044 147.109 484.977 158.329 485.199 165.663C485.717 182.784 491.875 194.447 511.363 194.447C545.145 194.447 588.299 130.18 614.752 75.6145C622.823 58.9659 625.768 43.7866 626.297 32.3196C626.966 17.8229 621.111 7.44417 609.429 7.44417C598.263 7.44417 590.819 15.469 582.63 32.4913C572.953 52.9181 567.246 77.2357 564.268 101.553C556.576 169.4 572.705 194.447 599.752 194.447C622.084 194.447 636.228 174.347 637.965 147.797C638.958 125.464 629.529 108.094 612.655 99.9057"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(1.0),
          ease: "easeInOut",
          delay: calc(3.6),
          opacity: { duration: 0.5, delay: calc(3.6) },
        }}
      />

      {/* Second е section */}
      <motion.path
        d="M627.435 111.605C650.877 140.695 671.435 163.786 702.07 160.251C728.288 157.226 744.169 140.849 744.913 124.472C745.657 108.591 736.973 96.9282 719.603 96.9282C699.007 96.9282 683.871 118.516 683.871 144.075C683.871 176.389 701.489 195.528 731.354 195.528C771.292 195.528 800.428 164.842 808.457 121.634C809.828 114.255 811.745 106.752 813.497 99.3406"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeInOut",
          delay: calc(4.5),
          opacity: { duration: 0.35, delay: calc(4.5) },
        }}
      />

      {/* Final section */}
      <motion.path
        d="M813.497 99.3404C809.21 117.469 806.336 132.164 804.809 143.082C803.54 151.022 802.746 156.481 802.436 163.181C802.026 180.799 811.909 193.454 831.017 193.454C858.809 193.454 872.618 168.726 880.991 128.171C882.993 118.471 885.175 109.215 886.941 99.4696"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeInOut",
          delay: calc(5.1),
          opacity: { duration: 0.25, delay: calc(5.1) },
        }}
      />

      {/* Tail */}
      <motion.path
        d="M886.941 99.4696C880.737 133.713 875.682 154.248 875.682 165.663C875.682 182.784 882.382 194.447 897.766 194.447C917.121 194.447 928.536 181.295 933.747 166.903"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.4),
          ease: "easeInOut",
          delay: calc(5.55),
          opacity: { duration: 0.2, delay: calc(5.55) },
        }}
      />

      {/* Accent mark */}
      <motion.path
        className="stroke-yellow-400"
        d="M831.017 46.5558C831.017 57.2258 838.461 66.6551 852.853 66.6551C867.742 66.6551 879.652 55.9851 882.878 37.6228"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.4),
          ease: "easeOut",
          delay: calc(5.9),
          opacity: { duration: 0.2, delay: calc(5.9) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloCatalanEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 562 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Hola</title>
      <motion.path
        d="M8.69238 169.542C36.1868 153.357 59.9736 133.05 86.5141 97.1177C105.141 71.8991 114.252 49.2249 114.75 31.1564C114.998 17.7574 108.546 7.59264 96.3876 7.59264C82.9881 7.59264 74.5513 17.7574 69.3404 41.0902C63.6332 66.7331 59.4149 96.1574 48.7449 190.51"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          opacity: { duration: 0.4 },
        }}
      />
      <motion.path
        d="M49.7905 181.289C55.0546 135.015 76.04 98.2021 102.591 98.2021C118.472 98.2021 128.565 110.857 125.699 128.971C124.086 139.641 121.171 152.048 119.506 164.207C117.48 179.592 123.267 191.502 141.161 191.502C166.418 191.502 182.318 166.979 189.198 137.941"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(0.7),
          opacity: { duration: 0.4, delay: calc(0.7) },
        }}
      />
      <motion.path
        d="M234.601 94.48C209.779 96.4865 191.211 117.524 187.703 146.341C184.477 172.644 199.117 192.495 222.442 192.495C250.73 192.495 269.092 168.177 270.333 137.904C271.325 108.872 257.43 94.2318 238.571 94.2318C223.683 94.2318 215.742 105.398 216.239 119.046C216.723 137.706 230.717 158.658 260.078 161.335C300.803 165.048 356.502 134.939 378.992 75.7416C385.479 58.6671 387.951 42.5606 387.951 31.3053C387.951 17.9598 383.732 7.71234 371.822 7.71234C360.159 7.71234 352.467 16.7682 345.519 31.067C337.379 47.6508 331.357 71.5703 328.894 98.609C322.69 166.455 336.586 191.502 366.314 191.502C396.441 191.502 416.363 165.389 424.978 135.185"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(1.5),
          ease: "easeInOut",
          delay: calc(1.4),
          opacity: { duration: 0.6, delay: calc(1.4) },
        }}
      />
      <motion.path
        d="M503.236 112.984C498.372 101.789 488.032 94.2318 471.572 94.2318C444.277 94.2318 423.764 121.527 422.417 150.807C421.243 177.606 433.609 192.671 451.222 192.495C476.223 192.245 494.6 167.689 502.803 115.732C503.815 109.321 504.864 102.627 505.876 96.2169"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(2.8),
          opacity: { duration: 0.4, delay: calc(2.8) },
        }}
      />
      <motion.path
        d="M505.875 96.217C504.851 102.719 503.826 109.222 502.802 115.724C498.32 144.164 496.253 155.384 496.475 162.718C496.993 179.84 503.15 191.502 518.535 191.502C537.89 191.502 548.745 178.351 553.956 163.959"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(3.5),
          opacity: { duration: 0.4, delay: calc(3.5) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloChineseHKEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 466 221"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>你好 (HK)</title>
      <motion.path
        d="M10.6749 63.9878C6.96214 92.8117 6.94814 126.16 9.11378 156.836"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4) }}
      />
      <motion.path
        d="M7.81006 103.337C8.3382 82.5588 18.4378 64.0295 35.1261 64.0295C48.4891 64.0295 55.7526 75.1771 54.89 95.6345C54.03 116.03 46.6231 139.103 35.6502 156.137"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.6), delay: calc(0.4) }}
      />
      <motion.path
        d="M35.9009 156.137C44.3943 157.251 56.8766 156.416 65.0941 154.745"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.3), delay: calc(1.0) }}
      />
      <motion.path
        d="M148.373 9.73803C128.77 36.0408 98.2485 68.7951 75.916 85.4204"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(1.3) }}
      />
      <motion.path
        d="M141.587 19.4663C157.185 39.123 187.49 65.3068 211.4 81.202"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(1.8) }}
      />
      <motion.path
        d="M111.648 88.6462C137.188 90.6299 160.078 90.952 179.638 88.2285"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(2.3) }}
      />
      <motion.path
        d="M179.638 88.2285C117.073 98.6034 87.0375 144.564 98.4967 197.532"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(2.8) }}
      />
      <motion.path
        d="M98.4966 197.515C101.837 166.629 117.879 142.27 144.65 139.41C166.461 137.08 180.879 147.823 180.879 167.045C180.879 186.362 163.944 203.57 135.221 213.212"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(3.6) }}
      />
      <motion.path
        d="M135.221 213.212C155.569 212.468 176.164 211.723 194.526 209.986"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4), delay: calc(4.4) }}
      />
      <motion.path
        d="M301.971 18.1748C283.067 50.5155 264.164 82.8563 245.261 115.197"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(4.8) }}
      />
      <motion.path
        d="M281.697 55.8919C284.985 99.8125 283.615 171.773 280.602 201.301"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(5.6) }}
      />
      <motion.path
        d="M340.774 46.9456C366.875 42.7775 397.309 41.415 429.312 43.0164"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(6.4) }}
      />
      <motion.path
        d="M388.363 7.44422C388.632 17.0658 386.748 48.9 382.306 86.7212"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(7.2) }}
      />
      <motion.path
        d="M322.769 95.1616C366.494 87.6248 430.513 84.8335 458.458 86.5499"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(8.0) }}
      />
      <motion.path
        d="M458.458 86.55C410.957 106.584 354.845 133.729 312.852 165.272"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(8.8) }}
      />
      <motion.path
        d="M424.573 151.545C399.944 159.076 376.201 164.084 352.952 167.077"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.6), delay: calc(9.6) }}
      />
      <motion.path
        d="M355.902 124.559C352.863 138.56 351.836 153.531 352.292 167.117C353.182 193.606 366.121 207.47 393.481 208.455C423.305 209.529 441.98 197.68 448.921 182.906"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(10.2) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloChineseSimplifiedEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 492 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>你好 (Simplified)</title>
      <motion.path
        d="M60.0571 18.1155C42.9356 50.4563 25.814 82.797 8.69238 115.138"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M41.6947 55.8326C44.6724 99.7532 43.4317 171.713 40.7021 201.242"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(0.8) }}
      />
      <motion.path
        d="M130.033 7.44551C115.723 33.0865 101.414 58.7276 87.1045 84.3686"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.6), delay: calc(1.6) }}
      />
      <motion.path
        d="M87.1045 84.3686C107.427 58.841 135.925 39.2073 169.983 39.2073C187.353 39.2073 198.767 47.1477 198.767 62.5323C198.767 75.9318 190.578 87.8425 178.42 95.2867"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(2.2) }}
      />
      <motion.path
        d="M136.98 92.5571C139.71 109.927 142.687 145.907 142.687 178.661C142.687 201.986 136.98 212.16 121.844 212.408C102.489 212.656 82.5992 191.968 82.6104 173.854C82.6162 164.424 86.5916 156.071 96.7701 148.346C111.049 137.328 140.454 129.53 168.99 130.026C194.796 130.522 206.955 141.192 206.955 158.314C206.955 173.947 199.759 188.091 189.337 198.264"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(3.0) }}
      />
      <motion.path
        d="M329.381 11.7535C307.274 62.3829 294.259 103.476 294.259 123.942C294.259 149.535 327.177 190.68 353.81 204.679"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(4.5) }}
      />
      <motion.path
        d="M349.861 66.5026C344.65 124.071 328.273 166.006 313.881 183.872C305.196 194.79 295.519 200.001 282.367 199.753C265.246 199.257 248.124 181.143 246.387 154.84C245.395 139.952 249.365 126.552 256.313 115.138C277.653 79.9021 329.514 61.2917 365.99 61.2917"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.2), delay: calc(5.5) }}
      />
      <motion.path
        d="M388.818 25.3115C396.196 16.1529 407.429 9.18247 422.317 9.67875C436.213 10.175 444.65 17.6192 445.146 30.0261C445.89 46.8988 431.466 61.8038 403.707 75.6837"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(6.7) }}
      />
      <motion.path
        d="M403.707 75.6837C422.797 90.3686 435.947 115.611 438.198 149.629C440.928 189.828 430.506 210.175 412.64 210.175C392.293 210.175 369.96 179.902 368.968 153.103C368.471 138.711 373.698 129.274 387.578 122.334C408.67 111.664 452.59 112.905 484.104 124.567"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(7.5) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloChineseTraditionalEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 462 237"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>你好 (Traditional)</title>
      <motion.path
        d="M11.6744 69.6893C7.96165 98.5131 7.94765 131.862 10.1133 162.537"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4) }}
      />
      <motion.path
        d="M8.80957 109.039C9.33771 88.2602 19.4373 69.7309 36.1256 69.7309C49.4886 69.7309 56.7521 80.8785 55.8895 101.336C55.0295 121.732 47.6226 144.804 36.6497 161.838"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.6), delay: calc(0.4) }}
      />
      <motion.path
        d="M36.9004 161.839C45.3938 162.952 57.8762 162.117 66.0936 160.446"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.3), delay: calc(1.0) }}
      />
      <motion.path
        d="M149.372 15.4394C129.769 41.7421 99.2475 74.4964 76.915 91.1217"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(1.3) }}
      />
      <motion.path
        d="M142.587 25.1677C158.185 44.8244 188.489 71.0082 212.647 86.9034"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(1.8) }}
      />
      <motion.path
        d="M112.647 94.3475C138.188 96.3313 161.078 96.6533 180.638 93.9299"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(2.3) }}
      />
      <motion.path
        d="M180.638 93.93C118.073 104.305 88.037 150.266 99.4962 203.234"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(2.8) }}
      />
      <motion.path
        d="M99.4961 203.217C102.837 172.33 118.878 147.972 145.65 145.112C167.46 142.781 181.878 153.524 181.878 172.746C181.878 192.063 164.943 209.271 136.221 218.913"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(3.6) }}
      />
      <motion.path
        d="M136.221 218.913C156.568 218.169 177.164 217.424 195.526 215.687"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4), delay: calc(4.4) }}
      />
      <motion.path
        d="M246.046 68.8784C243.195 102.211 243.184 140.777 244.847 176.251"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.6), delay: calc(4.8) }}
      />
      <motion.path
        d="M244.124 102.813C244.714 84.0207 252.795 68.9696 266.64 68.9696C277.437 68.9696 282.33 78.3373 281.511 97.0755C280.303 124.715 272.604 156.173 264.791 175.444"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(5.4) }}
      />
      <motion.path
        d="M264.791 175.444C271.511 176.739 280.724 175.777 287.071 173.834"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.3), delay: calc(6.2) }}
      />
      <motion.path
        d="M293.91 9.41528C294.231 21.3079 295.892 38.073 299.496 50.9572"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4), delay: calc(6.5) }}
      />
      <motion.path
        d="M299.496 50.9571C297.381 40.7165 299.878 29.6829 305.456 23.0921C311.491 15.9603 320.493 11.8081 337.953 9.45085C355.435 7.09074 385.821 6.65672 404.21 8.98777C419.414 10.8883 426.295 18.417 426.047 29.5833C425.55 45.4642 406.444 52.4121 365.004 53.4046C346.642 53.9009 330.615 52.5829 321.335 50.6661"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(6.9) }}
      />
      <motion.path
        d="M335.476 9.52428C341.679 30.9973 346.295 44.4302 349.52 53.4027"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4), delay: calc(7.9) }}
      />
      <motion.path
        d="M390.563 9.51168C384.111 29.911 379.397 43.2468 375.923 52.9215"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4), delay: calc(8.3) }}
      />
      <motion.path
        d="M330.011 82.6598C321.703 90.5057 312.913 99.7983 304.942 108.645"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.4), delay: calc(8.7) }}
      />
      <motion.path
        d="M304.942 108.645C329.406 117.685 342.967 135.076 343.686 153.197C344.299 168.617 335.576 176.132 326.113 176.132C316.859 176.132 309.627 168.957 310.72 156.482C311.727 145 317.622 135.41 329.308 122.571C346.357 103.84 359.973 91.8439 375.65 78.6864"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(9.1) }}
      />
      <motion.path
        d="M284.572 199.615C284.372 205.839 287.582 219.903 291.121 226.285"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.3), delay: calc(9.9) }}
      />
      <motion.path
        d="M312.343 199.857C312.213 204.86 315.206 216.16 318.432 221.286"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.3), delay: calc(10.2) }}
      />
      <motion.path
        d="M338.255 199.398C338.191 203.608 341.333 213.114 344.627 217.423"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.3), delay: calc(10.5) }}
      />
      <motion.path
        d="M367.35 86.5042C369.372 117.584 370.177 179.736 369.295 229.087"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(10.8) }}
      />
      <motion.path
        d="M428.698 71.5826C417.923 83.0814 405.005 93.264 392.093 103.177"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(11.6) }}
      />
      <motion.path
        d="M392.104 103.31C407.344 100.294 426.497 98.5015 442.794 99.1222"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(12.1) }}
      />
      <motion.path
        d="M392.915 140.348C407.275 138.29 425.357 137.164 440.781 137.222"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(12.6) }}
      />
      <motion.path
        d="M393.447 174.867C408.073 173.137 426.954 172.095 442.909 171.747"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(13.1) }}
      />
      <motion.path
        d="M416.179 120.44C417.404 147.615 417.555 179.958 417.137 209.712"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(13.6) }}
      />
      <motion.path
        d="M369.295 213.246C396.413 211.069 431.074 209.279 453.881 208.675"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(14.4) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloCroatianEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1218 203"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Bok</title>
      <motion.path
        d="M89.8412 117.276C84.9937 105.861 74.967 97.1763 57.8454 97.1763C30.5501 97.1763 10.5205 124.472 8.62811 153.752C6.95501 180.551 19.0419 195.687 36.6569 195.439C61.4679 195.191 79.4915 170.664 89.3738 119.757C95.7528 86.8965 102.164 53.8581 108.543 20.9976"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M108.543 20.9975C103.48 47.1348 98.4176 73.2721 93.3551 99.4094C86.7807 133.352 82.331 154.248 82.4638 165.663C82.6632 182.784 88.9397 194.447 105.411 194.447C128.585 194.447 151.974 170.209 158.922 140.885"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(0.8) }}
      />
      <motion.path
        d="M204.325 97.4243C179.503 99.4309 160.934 120.469 157.426 149.285C154.2 175.588 168.841 195.439 192.166 195.439C220.454 195.439 238.816 171.122 240.057 140.849C241.049 111.816 227.153 97.1762 208.295 97.1762C193.406 97.1762 185.466 108.342 185.962 121.99C186.447 140.65 200.441 161.602 229.794 164.278C270.497 167.99 322.812 127.749 349.618 71.5629C356.797 56.5173 359.398 42.2586 360.15 31.327C360.9 17.4144 355.193 7.44417 344.027 7.44417C332.86 7.44417 325.416 15.469 317.228 32.4913C307.55 52.9181 301.843 77.2357 298.865 101.553C291.173 169.4 307.302 194.447 334.349 194.447C356.682 194.447 370.826 174.347 372.563 147.797C373.555 125.464 364.126 108.094 347.253 99.9057"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(1.6) }}
      />
      <motion.path
        d="M362.032 111.605C388.98 145.044 426.743 132.871 443.52 113.541"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(3.1) }}
      />
      <motion.path
        d="M508.691 115.929C503.827 104.734 493.487 97.1761 477.027 97.1761C449.732 97.1761 429.219 124.471 427.872 153.752C426.698 180.551 439.064 195.615 456.678 195.439C481.678 195.189 500.055 170.633 508.258 118.676C509.27 112.266 510.319 105.572 511.331 99.1612"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(3.6) }}
      />
      <motion.path
        d="M511.331 99.1613C510.306 105.664 509.282 112.166 508.257 118.669C503.776 147.109 501.708 158.329 501.93 165.663C502.449 182.784 508.606 194.447 526.859 194.447C556.299 194.447 581.007 152.573 593.655 95.9355"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(4.4) }}
      />
      <motion.path
        d="M591.694 104.362C622.464 105.851 636.086 112.065 636.086 126.705C636.086 136.878 631.124 152.511 629.635 163.926C626.905 183.777 634.228 194.695 649.982 194.695C669.139 194.695 682.396 181.968 687.568 169.037"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(5.2) }}
      />
      <motion.path
        d="M866.02 117.275C861.172 105.861 851.146 97.1761 834.024 97.1761C806.729 97.1761 786.699 124.471 784.807 153.752C783.134 180.551 795.221 195.687 812.836 195.439C837.647 195.191 855.67 170.664 865.552 119.757C871.932 86.8963 878.343 53.8579 884.722 20.9974"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(6.0) }}
      />
      <motion.path
        d="M884.721 20.9975C879.659 47.1348 874.596 73.2721 869.534 99.4094C862.959 133.352 858.51 154.248 858.643 165.663C858.842 182.784 865.118 194.447 881.63 194.447C904.947 194.447 927.562 167.337 935.892 138.13"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(6.8) }}
      />
      <motion.path
        d="M1014.15 115.929C1009.29 104.734 998.946 97.1761 982.486 97.1761C955.191 97.1761 934.678 124.471 933.331 153.752C932.157 180.551 944.523 195.615 962.137 195.439C987.137 195.189 1005.51 170.633 1013.72 118.676C1014.73 112.266 1015.78 105.572 1016.79 99.1612"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(7.6) }}
      />
      <motion.path
        d="M1016.79 99.1613C1015.77 105.664 1014.74 112.166 1013.72 118.669C1009.23 147.109 1007.17 158.329 1007.39 165.663C1007.91 182.784 1014.06 194.447 1031.29 194.447C1057.12 194.447 1082.5 161.731 1089.99 121.41C1091.32 114.255 1093.27 106.693 1094.4 99.1613"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(8.4) }}
      />
      <motion.path
        d="M1094.4 99.1613C1089.68 130.675 1085.71 161.692 1080.75 193.206"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(9.2) }}
      />
      <motion.path
        d="M1084.13 170.885C1090.96 124.254 1111.77 97.1762 1136.58 97.1762C1153.95 97.1762 1162.88 109.087 1161.4 125.96C1160.16 138.615 1155.94 153.256 1154.94 165.663C1153.7 182.784 1162.76 194.447 1177.03 194.447C1194.98 194.447 1205.57 182.248 1210.4 168.899"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(9.7) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloCzechEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 276"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Ahoj</title>
      <motion.path
        d="M89.4444 112.836C84.5798 101.641 74.2397 94.0833 57.7803 94.0833C30.485 94.0833 9.97154 121.379 8.62484 150.659C7.45117 177.458 19.8171 192.523 37.4305 192.346C62.4308 192.096 80.8076 167.54 89.0106 115.583C90.0227 109.173 91.0715 102.479 92.0836 96.0684"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M92.084 96.0685C91.0593 102.571 90.0347 109.073 89.0101 115.576C84.5287 144.016 82.4611 155.236 82.6831 162.57C83.2015 179.691 89.3589 191.354 107.66 191.354C137.271 191.354 167.484 133.288 194.252 97.0491C212.938 71.7507 222.049 49.0765 222.546 31.0079C222.795 17.6089 216.343 7.44417 204.184 7.44417C190.785 7.44417 182.348 17.6089 177.137 40.9417C171.43 66.5846 167.211 96.0089 156.541 190.361"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(0.8) }}
      />
      <motion.path
        d="M157.587 181.14C162.851 134.866 183.836 98.0535 210.387 98.0535C226.268 98.0535 236.361 110.709 233.495 128.823C231.882 139.493 228.967 151.9 227.302 164.058C225.276 179.443 231.064 191.354 248.808 191.354C273.514 191.354 284.798 164.434 294.064 138.098C303.439 111.453 315.102 94.8277 339.42 94.8277C359.519 94.8277 375.4 109.716 375.4 137.756C375.4 168.773 355.276 192.098 329.846 192.346C307.468 192.594 292.769 174.48 294.258 147.185C295.995 116.912 314.357 94.8277 338.427 94.8277C352.323 94.8277 362 99.5424 373.166 107.731C407.735 132.949 436.415 120.755 446.616 95.8203"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(2.3) }}
      />
      <motion.path
        d="M446.616 95.8204C441.984 135.109 437.352 174.398 432.72 213.686C428.125 252.659 416.591 268.277 399.221 268.277C387.559 268.277 379.122 260.85 379.122 248.922C379.122 232.985 391.216 221.543 419.072 212.942C469.879 197.254 491.271 179.263 504.432 145.2"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(3.8) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloDanishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 276"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Hej</title>
      <motion.path
        d="M7.69238 166.558C35.2396 151.245 60.3412 131.553 88.8194 98.0349C108.204 75.1542 118.626 49.0281 119.122 31.008C119.37 17.6089 112.837 7.44417 100.76 7.44417C87.3601 7.44417 78.9233 17.6089 73.7124 40.9417C68.0052 66.5846 63.7869 96.0089 53.1169 190.361"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M54.1631 181.14C59.6258 133.12 80.4126 98.0536 106.963 98.0536C122.844 98.0536 132.937 110.709 130.071 128.823C128.458 139.493 126.588 150.411 124.409 163.066C121.87 178.947 129.129 191.354 151.123 191.354C183.198 191.354 218.19 173.529 236.098 145.921C242.199 136.515 244.681 128.078 244.929 119.89C245.177 105.001 236.74 93.8352 221.852 93.8352C202.993 93.8352 188.601 115.175 188.601 142.47C188.601 171.751 204.482 192.346 235.94 192.346C274.221 192.346 305.9 161.766 313.931 118.542C315.303 111.162 317.24 103.364 318.13 95.8203"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(2.0), delay: calc(0.8) }}
      />
      <motion.path
        d="M318.13 95.8204C313.498 135.109 308.866 174.398 304.234 213.686C299.639 252.659 288.105 268.277 270.735 268.277C259.072 268.277 250.636 260.85 250.636 248.922C250.636 232.985 262.73 221.543 290.586 212.942C341.392 197.254 362.785 179.263 375.946 145.2"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(2.8) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloDutchEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 668 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Hallo</title>
      <motion.path
        d="M7.69226 169.416C35.1867 153.231 58.9735 132.924 85.514 96.9917C104.141 71.7732 113.252 49.099 113.75 31.0304C113.998 17.6314 107.546 7.46666 95.3874 7.46666C81.9879 7.46666 73.5512 17.6314 68.3403 40.9642C62.6331 66.6071 58.4147 96.0314 47.7448 190.384"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M48.7905 181.163C54.0546 134.889 75.04 98.0761 101.591 98.0761C117.472 98.0761 127.565 110.731 124.699 128.845C123.086 139.515 120.171 151.922 118.506 164.081C116.48 179.466 122.267 191.376 140.19 191.376C165.556 191.376 180.752 163.941 188.99 135.059"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(0.8) }}
      />
      <motion.path
        d="M267.249 112.858C262.384 101.663 252.044 94.1058 235.585 94.1058C208.289 94.1058 187.776 121.401 186.429 150.681C185.255 177.48 197.621 192.545 215.235 192.369C240.235 192.119 258.612 167.563 266.815 115.606C267.827 109.195 268.876 102.501 269.888 96.0909"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(1.6) }}
      />
      <motion.path
        d="M269.888 96.0909C268.863 102.593 267.839 109.096 266.814 115.598C262.333 144.038 260.265 155.258 260.487 162.592C261.005 179.714 267.163 191.376 286.65 191.376C320.429 191.376 367.006 134.578 389.416 75.5902C395.893 58.5411 398.365 42.4346 398.365 31.1793C398.365 17.8337 394.147 7.5863 382.236 7.5863C370.574 7.5863 362.881 16.6422 355.933 30.9409C347.793 47.5248 341.772 71.4443 339.308 98.483C333.105 166.329 347 191.376 380.041 191.376C420.104 191.376 464.647 135.563 487.39 75.6967C493.908 58.5411 496.38 42.4346 496.38 31.1793C496.38 17.8337 492.162 7.5863 480.251 7.5863C468.588 7.5863 460.896 16.6422 453.948 30.9409C445.808 47.5248 439.786 71.4443 437.323 98.483C431.119 166.329 445.015 191.376 474.52 191.376C503.979 191.376 519.982 165.698 529.576 138.431C539.06 111.476 550.722 94.8502 575.04 94.8502C595.139 94.8502 611.02 109.739 611.02 137.778C611.02 168.796 590.896 192.121 565.466 192.369C543.088 192.617 528.39 174.503 529.879 147.208C531.616 116.935 549.978 94.8502 574.047 94.8502C587.943 94.8502 599.615 101.027 608.787 107.753C633.654 125.894 652.814 114.684 660.152 96.7467"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(3.5), delay: calc(3.1) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloFinnishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 374 201"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Hei</title>
      <motion.path
        d="M8.69238 166.558C36.2396 151.245 61.3412 131.553 89.8194 98.0349C109.204 75.1542 119.626 49.0282 120.122 31.008C120.37 17.609 113.837 7.4442 101.76 7.4442C88.3601 7.4442 79.9233 17.609 74.7124 40.9417C69.0052 66.5846 64.7869 96.009 54.1169 190.361"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M55.1626 181.14C60.6253 133.12 81.4121 98.0536 107.963 98.0536C123.844 98.0536 133.937 110.709 131.071 128.823C129.458 139.493 127.588 150.411 125.409 163.066C122.869 178.947 130.128 191.354 152.122 191.354C184.197 191.354 219.19 173.529 237.098 145.921C243.199 136.515 244.681 128.078 245.928 119.89C246.176 105.002 237.74 93.8353 222.851 93.8353C203.993 93.8353 189.601 115.175 189.601 142.471C189.601 171.751 205.482 192.346 236.87 192.346C274.923 192.346 304.966 161.49 312.949 118.523C314.317 111.162 316.161 103.577 317.431 96.0685"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(2.0), delay: calc(0.8) }}
      />
      <motion.path
        d="M317.431 96.0685C314.579 112.942 311.953 126.838 310.308 139.245C309.376 147.433 308.932 154.381 308.984 161.329C309.117 179.195 317.813 191.354 332.281 191.354C350.533 191.354 361.217 179.112 366.114 165.534"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(2.8) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloFrenchEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 948 279"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Bonjour</title>
      <motion.path
        d="M8.69238 174.928C49.3676 160.761 77.0425 132.172 105.744 72.016C113.138 56.5173 115.74 42.2586 116.492 31.327C117.242 17.4144 111.534 7.44417 100.368 7.44417C89.202 7.44417 81.7578 15.469 73.5692 32.4913C63.8918 52.9181 58.1846 77.2357 55.2069 101.553C47.5146 169.4 63.6437 194.447 90.6908 194.447C113.023 194.447 127.167 174.347 128.904 147.797C129.897 125.464 120.467 108.094 103.594 99.9057"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5) }}
      />
      <motion.path
        d="M118.374 111.605C143.312 142.551 183.923 120.366 202.773 106.334C211.031 100.187 218.314 97.9205 227.167 97.9205C246.77 97.9205 262.155 112.809 262.155 140.849C262.155 171.866 242.552 195.191 217.738 195.439C195.902 195.687 181.51 177.573 182.999 150.278C184.736 120.005 202.602 97.9205 226.175 97.9205C239.574 97.9205 249.004 102.635 259.922 110.824C290.584 133.756 321.43 122.663 328.904 99.1612"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(1.5) }}
      />
      <motion.path
        d="M328.904 99.1613C324.189 130.675 320.219 161.692 315.256 193.206"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(3.0) }}
      />
      <motion.path
        d="M318.639 170.885C325.47 124.254 346.274 97.1762 371.088 97.1762C388.457 97.1762 397.39 109.087 395.902 125.96C394.661 138.615 390.443 153.256 389.45 165.663C388.209 182.784 396.15 194.447 413.396 194.447C439.294 194.447 465.133 161.805 472.637 121.416C473.968 114.255 475.906 106.457 476.795 98.9132"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(3.5) }}
      />
      <motion.path
        d="M476.795 98.9132C472.163 138.202 467.531 177.491 462.899 216.779C458.305 255.751 446.77 271.37 429.401 271.37C417.738 271.37 409.301 263.943 409.301 252.015C409.301 236.077 421.396 224.636 448.306 216.327C494.718 201.996 528.613 174.612 539.75 142.962C549.748 114.546 561.41 97.9206 585.728 97.9206C605.827 97.9206 621.708 112.809 621.708 140.849C621.708 171.866 601.584 195.191 576.154 195.439C553.776 195.687 539.078 177.573 540.567 150.278C542.304 120.005 560.666 97.9206 584.736 97.9206C598.631 97.9206 608.309 102.635 619.475 110.824C653.489 135.637 681.745 123.875 691.781 99.3404"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(2.5), delay: calc(5.0) }}
      />
      <motion.path
        d="M691.781 99.3404C687.494 117.469 684.62 132.164 683.093 143.082C681.824 151.022 681.03 156.481 680.72 163.181C680.31 180.799 690.193 193.454 709.301 193.454C737.093 193.454 750.902 168.726 759.275 128.171C761.277 118.471 763.459 109.215 765.225 99.4696"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(7.5) }}
      />
      <motion.path
        d="M765.225 99.4696C759.021 133.713 753.966 154.248 753.966 165.663C753.966 182.784 760.666 194.447 778.935 194.447C808.43 194.447 833.611 152.642 846.274 95.9355"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(8.3) }}
      />
      <motion.path
        d="M844.313 104.362C875.083 105.851 888.706 112.065 888.706 126.705C888.706 136.878 883.743 152.511 882.254 163.926C879.524 183.777 886.847 194.447 902.601 194.695C921.759 194.695 935.015 181.968 940.187 169.037"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(9.3) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloGermanEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 668 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Hallo</title>
      <motion.path
        d="M7.69238 169.427C35.1868 153.241 58.9736 132.934 85.5141 97.0022C104.141 71.7837 113.252 49.1095 113.75 31.0409C113.998 17.6419 107.546 7.47716 95.3876 7.47716C81.9881 7.47716 73.5513 17.6419 68.3404 40.9747C62.6332 66.6176 58.4149 96.0419 47.7449 190.394"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M48.791 181.173C54.0551 134.899 75.0405 98.0866 101.591 98.0866C117.472 98.0866 127.565 110.742 124.699 128.856C123.086 139.526 120.171 151.933 118.506 164.092C116.48 179.476 122.268 191.387 140.191 191.387C165.556 191.387 180.753 163.951 188.99 135.07"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(0.8) }}
      />
      <motion.path
        d="M267.249 112.869C262.384 101.674 252.044 94.1163 235.585 94.1163C208.29 94.1163 187.776 121.412 186.43 150.692C185.256 177.491 197.622 192.556 215.235 192.379C240.235 192.129 258.612 167.573 266.815 115.616C267.827 109.206 268.876 102.512 269.888 96.1014"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(1.6) }}
      />
      <motion.path
        d="M269.888 96.1014C268.863 102.604 267.838 109.106 266.814 115.609C262.332 144.049 260.265 155.269 260.487 162.603C261.005 179.724 267.163 191.387 286.65 191.387C320.429 191.387 367.006 134.588 389.416 75.6007C395.893 58.5516 398.365 42.4451 398.365 31.1898C398.365 17.8442 394.147 7.5968 382.236 7.5968C370.573 7.5968 362.881 16.6527 355.933 30.9514C347.793 47.5353 341.771 71.4548 339.308 98.4935C333.104 166.34 347 191.387 380.04 191.387C420.104 191.387 464.647 135.573 487.39 75.7072C493.908 58.5516 496.38 42.4451 496.38 31.1898C496.38 17.8337 492.162 7.5968 480.251 7.5968C468.588 7.5968 460.896 16.6527 453.948 30.9514C445.808 47.5353 439.786 71.4548 437.323 98.4935C431.119 166.34 445.015 191.387 474.52 191.387C503.979 191.387 519.982 165.708 529.576 138.441C539.06 111.486 550.722 94.8607 575.04 94.8607C595.139 94.8607 611.02 109.749 611.02 137.789C611.02 168.806 590.896 192.121 565.466 192.379C543.088 192.627 528.39 174.513 529.879 147.218C531.616 116.945 549.978 94.8607 574.047 94.8607C587.943 94.8607 599.615 101.038 608.787 107.764C633.654 125.905 652.814 114.694 660.152 96.7572"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(3.5), delay: calc(3.1) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloGreekEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 848 246"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Γεια σας</title>
      <motion.path
        d="M8.69238 111.415C14.1514 96.7749 26.5584 85.8568 41.6949 85.8568C59.3127 85.8568 66.2606 98.2637 68.742 128.537C70.3136 147.313 71.8851 166.088 73.4566 184.864C76.6825 222.829 84.871 238.214 103.233 238.214C121.596 238.214 135.491 223.574 139.71 206.452"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M123.332 84.6161C91.5707 134.74 56.335 185.361 16.8809 236.477"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(0.8) }}
      />
      <motion.path
        d="M257.079 84.6161C238.717 141.688 216.385 180.646 184.871 180.646C166.757 180.646 156.087 166.006 157.079 139.703C158.32 106.7 175.193 82.8791 196.533 82.8791C214.648 82.8791 223.581 94.7898 227.799 123.078C228.461 127.792 229.122 132.507 229.784 137.222C234.251 166.502 239.977 179.653 260.231 179.653C287.964 179.653 322.72 124.674 333.258 84.368"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(1.6) }}
      />
      <motion.path
        d="M333.258 84.368C324.325 119.107 320.354 137.47 320.354 152.11C320.354 167.495 328.047 179.653 347.018 179.653C369.267 179.653 395.117 159.833 405.218 129.529"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(3.1) }}
      />
      <motion.path
        d="M405.218 129.529C404.226 156.328 418.121 178.413 441.695 178.413C472.216 178.413 485.863 154.839 486.856 128.785C487.849 100.497 471.719 84.1198 450.38 84.1198C424.573 84.1198 408.196 104.219 403.233 140.447C395.045 199.256 416.136 234.244 450.38 234.244C459.064 234.244 466.757 232.011 472.712 228.289"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(4.1) }}
      />
      <motion.path
        d="M366.757 7.44493C358.072 20.3482 349.139 32.2588 339.214 43.6732"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(5.6) }}
      />
      <motion.path
        d="M598.364 94.2935C592.161 88.09 581.739 82.8791 565.858 82.8791C545.511 82.8791 531.863 93.0528 532.111 107.693C532.359 124.07 547.744 132.011 565.858 132.011C575.536 132.011 579.506 130.522 579.258 127.296C578.513 122.829 567.099 120.844 553.699 123.078C533.848 126.303 522.93 136.973 522.682 151.862C522.434 166.75 536.082 179.405 561.888 179.405C587.198 179.405 602.583 166.75 609.531 152.606"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(6.1) }}
      />
      <motion.path
        d="M628.945 82.3829C647.308 90.5714 674.603 93.5491 699.913 89.827C712.816 87.8419 718.523 85.3605 718.275 83.1273C718.027 81.1422 710.087 80.1496 696.687 83.3754C666.662 90.3233 647.804 118.611 647.804 143.673C647.804 165.509 662.196 179.653 682.295 179.653C696.439 179.653 708.102 174.442 716.787 165.509"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(7.6) }}
      />
      <motion.path
        d="M828.945 94.2935C822.742 88.09 812.32 82.8791 796.439 82.8791C776.092 82.8791 762.444 93.0528 762.692 107.693C762.941 124.07 778.325 132.011 796.439 132.011C806.117 132.011 810.087 130.522 809.839 127.296C809.094 122.829 797.68 120.844 784.28 123.078C764.429 126.303 753.511 136.973 753.263 151.862C753.015 166.75 766.663 179.405 792.469 179.405C817.779 179.405 833.164 166.75 840.112 152.606"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(9.1) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloHebrewEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 408 216"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>שלום</title>
      <motion.path
        d="M400.007 169.975C394.052 190.819 378.171 207.692 351.868 207.692C325.814 207.692 310.925 187.097 311.918 153.35C312.91 118.61 333.215 88.0893 358.568 88.0893C376.181 88.0893 385.115 101.758 381.893 120.595C376.186 153.35 339.461 169.727 288.841 173.201"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5) }}
      />
      <motion.path
        d="M250.132 133.251C221.348 134.243 199.015 156.576 200.752 183.375C201.496 199.504 212.415 208.189 225.318 208.189C244.425 208.189 258.32 192.556 256.583 162.283C254.847 134 238.127 98.3051 237.158 62.9467C236.287 31.1209 250.413 7.44419 277.427 7.44419C296.321 7.44419 307.895 18.57 314.648 31.2655"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(2.0), delay: calc(1.5) }}
      />
      <motion.path
        d="M163.035 90.5707C161.794 127.792 156.583 172.208 148.146 205.707"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(3.5) }}
      />
      <motion.path
        d="M29.7843 90.0744C72.2085 90.0744 107.948 133.251 106.707 177.419C106.211 196.774 96.0374 205.707 80.6528 205.707C55.6117 205.707 33.081 167.277 29.5361 91.3151"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(4.3) }}
      />
      <motion.path
        d="M29.5361 91.3151C25.5658 132.01 19.3624 170.223 8.69238 205.707"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.0), delay: calc(5.8) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloHungarianEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 638 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Helló</title>
      <motion.path
        d="M8.69238 166.57C36.2396 151.256 61.3412 131.565 89.8194 98.0467C109.204 75.166 119.626 49.04 -120.122 31.0198C120.37 17.6208 113.837 7.45604 101.76 7.45604C88.3601 7.45604 79.9233 17.6208 74.7124 40.9536C69.0052 66.5965 64.7869 96.0208 54.1169 190.373"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M55.1631 181.152C60.6258 133.132 81.4126 98.0654 107.963 98.0654C123.844 98.0654 133.937 110.72 131.071 128.835C129.458 139.505 127.588 150.423 125.409 163.078C122.87 178.959 130.129 191.366 152.123 191.366C184.197 191.366 219.19 173.541 237.098 145.933C243.199 136.527 245.681 128.09 245.929 119.902C246.177 105.013 237.74 93.847 222.852 93.847C203.993 93.847 189.601 115.187 189.601 142.482C189.601 171.763 205.482 192.358 239.209 192.358C285.066 192.358 335.86 137.309 359.199 75.876C365.789 58.5305 368.261 42.424 368.261 31.1686C368.261 17.8231 364.043 7.57568 352.132 7.57568C340.47 7.57568 332.777 16.6316 325.829 30.9303C317.689 47.5141 311.668 71.4336 309.204 98.4724C303.001 166.319 316.896 191.366 349.937 191.366C390 191.366 434.543 135.552 457.286 75.6861C463.804 58.5305 466.276 42.424 466.276 31.1686C466.276 17.8231 462.058 7.57568 450.147 7.57568C438.485 7.57568 430.792 16.6316 423.844 30.9303C415.704 47.5141 409.682 71.4336 407.219 98.4724C401.016 166.319 414.911 191.366 444.417 191.366C473.875 191.366 489.878 165.687 499.472 138.42C508.956 111.465 520.619 94.8396 544.936 94.8396C565.035 94.8396 580.916 109.728 580.916 137.768C580.916 168.785 560.792 192.11 535.363 192.358C512.984 192.606 498.286 174.492 499.775 147.197C501.512 116.924 519.874 94.8396 543.944 94.8396C557.839 94.8396 569.511 101.016 578.683 107.743C603.55 125.884 622.71 114.673 630.048 96.7361"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(4.0), delay: calc(0.8) }}
      />
      <motion.path
        d="M578.435 19.1573C567.021 32.0606 555.358 43.9712 542.951 55.3856"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.5), delay: calc(4.8) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloIndonesianEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 570 201"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Halo</title>
      <motion.path
        d="M7.69141 169.394C35.1858 153.208 58.9726 132.901 85.5131 96.9693C104.14 71.7507 113.251 49.0765 113.749 31.008C113.997 17.609 107.545 7.4442 95.3866 7.4442C81.9871 7.4442 73.5504 17.609 68.3394 40.9417C62.6322 66.5846 58.4139 96.009 47.7439 190.361"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8) }}
      />
      <motion.path
        d="M48.7891 181.14C54.0531 134.866 75.0386 98.0536 101.589 98.0536C117.47 98.0536 127.563 110.709 124.697 128.823C123.084 139.493 120.17 151.9 118.504 164.059C116.478 179.443 122.266 191.354 140.189 191.354C165.554 191.354 180.751 163.918 188.988 135.037"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), delay: calc(0.8) }}
      />
      <motion.path
        d="M267.248 112.836C262.384 101.641 252.043 94.0833 235.584 94.0833C208.289 94.0833 187.775 121.379 186.429 150.659C185.255 177.458 197.621 192.523 215.234 192.346C240.235 192.096 258.611 167.54 266.814 115.583C267.826 109.173 268.875 102.479 269.887 96.0685"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(1.5), delay: calc(1.6) }}
      />
      <motion.path
        d="M269.888 96.0685C268.863 102.571 267.838 109.073 266.814 115.576C262.332 144.016 260.265 155.236 260.487 162.57C261.005 179.691 267.163 191.354 286.65 191.354C320.429 191.354 367.006 134.555 389.416 75.5678C395.893 58.5186 398.365 42.4121 398.365 31.1568C398.365 17.8113 394.147 7.56384 382.236 7.56384C370.573 7.56384 362.881 16.6197 355.933 30.9185C347.793 47.5023 341.771 71.4218 339.308 98.4605C333.104 166.307 347 191.354 376.505 191.354C405.964 191.354 421.967 165.675 431.561 138.408C441.045 111.453 452.707 94.8278 477.025 94.8278C497.124 94.8278 513.005 109.716 513.005 137.756C513.005 168.773 492.881 192.098 467.451 192.346C445.073 192.594 430.375 174.48 431.864 147.185C433.601 116.912 451.963 94.8278 476.033 94.8278C489.928 94.8278 501.6 101.005 510.772 107.731C535.639 125.872 554.799 114.661 562.137 96.7242"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(3.5), delay: calc(3.1) }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

export {
  AppleHelloArabicEffect,
  AppleHelloBulgarianEffect,
  AppleHelloCatalanEffect,
  AppleHelloChineseHKEffect,
  AppleHelloChineseSimplifiedEffect,
  AppleHelloChineseTraditionalEffect,
  AppleHelloCroatianEffect,
  AppleHelloCzechEffect,
  AppleHelloDanishEffect,
  AppleHelloDutchEffect,
  AppleHelloEnglishEffect,
  AppleHelloFinnishEffect,
  AppleHelloFrenchEffect,
  AppleHelloGermanEffect,
  AppleHelloGreekEffect,
  AppleHelloHebrewEffect,
  AppleHelloHindiEffect,
  AppleHelloHungarianEffect,
  AppleHelloIndonesianEffect,
};
