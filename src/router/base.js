import ClassManage from '@/views/base/ClassManage.vue'
import ModifyPassword from '@/views/base/ModifyPassword.vue'
import StudentManage from '@/views/base/StudentManage.vue'
import TeacherManage from '@/views/base/TeacherManage.vue'


export default [
    {
        path: 'ClassManage',
        
        components:{
            key:ClassManage
        } 
    },
    {
        path: 'ModifyPassword',
       
        components: {
           key:ModifyPassword
        }
    },
    {
        path: 'StudentManage',
        
        components:{
            key:StudentManage
        }
    },
    {
        path: 'TeacherManage',
       
        components:{
            key:TeacherManage
        } 
    }

]