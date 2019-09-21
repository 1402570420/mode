import MakeTestPaper from '@/views/test/MakeTestPaper.vue'
import TestPaperManage from '@/views/test/TestPaperManage.vue'
import TestResult from '@/views/test/TestResult.vue'
import TestSetter from '@/views/test/TestSetter.vue'
import ViewTestPaper from '@/views/test/ViewTestPaper.vue'

export default [
    {
        path: 'MakeTestPaper',
        
        components:{
            key:MakeTestPaper
        } 
    },
    {
        path: 'TestPaperManage',
        
        components:{
            key:TestPaperManage
        } 
    },
    {
        path: 'TestResult',
        
        components:{
            key:TestResult
        } 
    },
    {
        path: 'TestSetter',
        
        components:{
            key:TestSetter
        } 
    },
    {
        path: 'ViewTestPaper',
        
        components:{
            key:ViewTestPaper
        } 
    },







]