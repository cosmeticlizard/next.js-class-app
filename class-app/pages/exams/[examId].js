import { useRouter } from 'next/router'
//import { useRef } from 'react'

function SolveExamsPage(){
    //const reactComp = useRef();
    const router = useRouter();
    const testId = router.query.testId;

    return  <h1>Solve Exams page</h1>
        
}

export default SolveExamsPage;