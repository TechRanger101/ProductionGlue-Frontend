import { MotionDiv } from "@/components/MotionDiv"


const variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
    
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ ease: "easeOut", duration: 0.5 }}
    >
      {children}
    </MotionDiv>
  )
}