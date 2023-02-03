<template>
  <div id="edit">

    <div class="main-container">
          <div class="pd-ltr-20">

            <form id="mainformEdit" @submit.prevent="saveDataMainEdit" class="needs-validation" novalidate autocomplete="off">
            <div class="row">
                <div class="col-xl-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                        <div class="mt-3"></div>
                        <h3 class="text-center">ฟอร์มแจ้งอุบัติเหตุ</h3>
                        <h5 class="text-center mt-2"><b>แก้ไขเอกสารเลขที่ : </b>{{this.$route.params.id}}</h5>
                        <input hidden type="text" name="formno-edit" id="formno-edit" :value="this.$route.params.id">
                        <hr>

                        <div class="row form-group">
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>วันที่เกิดเหตุ</b></label>
                                <input type="text" name="ipe-acci_datetime" id="ipe-acci_datetime" class="form-control" required>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>สถานที่เกิดเหตุ</b></label>
                                <input type="text" name="ipe-acci_location" id="ipe-acci_location" class="form-control" required>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>การเกิดขึ้นของอุบัติเหตุ ( เกิดจาก )</b></label>
                                <div class="custom-control custom-radio mb-5">
                                <input type="radio" class="custom-control-input ipe-type1" name="ipe-type1" id="ipe-type1-1" value="บุคคลภายในบริษัท" required>
                                    <label class="custom-control-label" for="ipe-type1-1">บุคคลภายในบริษัท</label>
                                </div>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" class="custom-control-input ipe-type1" name="ipe-type1" id="ipe-type1-2" value="บุคคลภายนอกบริษัท" required>
                                    <label class="custom-control-label" for="ipe-type1-2">บุคคลภายนอกบริษัท</label>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-12">
                                <label class="weight-600">หมวดหมู่</label>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" id="ipe-type2-1" name="ipe-type2" class="custom-control-input ipe-type2" value="asset" required>
                                    <label class="custom-control-label" for="ipe-type2-1">Asset</label>
                                </div>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" id="ipe-type2-2" name="ipe-type2" class="custom-control-input ipe-type2" value="man" required>
                                    <label class="custom-control-label" for="ipe-type2-2">Man</label>
                                </div>
                            </div>

                        </div>

                        <div class="row form-group">
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>ประเภทของอุบัติเหตุ</b></label>
                                <select name="ipe-type3" id="ipe-type3" class="form-control" required >
                                    <option value="">กรุณาเลือกประเภท</option>
                                    <option :value="acciTypeDatas.type_name" v-for="acciTypeDatas in acciTypeData" :key="acciTypeDatas.id">{{acciTypeDatas.type_name}} ( {{acciTypeDatas.type_description}} )</option>
                                </select>
                            </div>
                        </div>

                        <div class="row form-group">

                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ชื่อผู้ประสบเหตุ / ผู้ที่เกี่ยวข้อง</b></label>
                                <input type="text" name="ipe-acci_name" id="ipe-acci_name" class="form-control" required>
                                <div id="showEmployeeData"></div>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group" v-if="this.type1value != 'บุคคลภายนอกบริษัท'">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" name="ipe-acci_ecode" id="ipe-acci_ecode" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group" v-if="this.type1value != 'บุคคลภายนอกบริษัท'">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" name="ipe-acci_dept" id="ipe-acci_dept" class="form-control" readonly>
                                <input hidden type="text" name="ipe-acci_deptcode" id="ipe-acci_deptcode">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group" v-if="this.type1value != 'บุคคลภายในบริษัท'">
                                <label for=""><b>เลขบัตรประจำตัวประชาชน</b></label>
                                <input type="text" name="ipe-acci_cardno" id="ipe-acci_cardno" class="form-control">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group div_carno_e">
                                <label for=""><b>ทะเบียนรถ</b></label>
                                <input type="text" name="ipe-acci_carno" id="ipe-acci_carno" class="form-control">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ตำแหน่ง / หน้าที่ความรับผิดชอบ</b></label>
                                <input type="text" name="ipe-acci_res" id="ipe-acci_res" class="form-control" required>
                            </div>
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>รายละเอียด</b></label>
                                <textarea name="ipe-acci_detail" id="ipe-acci_detail" cols="30" rows="10" class="form-control" required></textarea>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12 col-sm-12">
                                <label><b>แนบหลักฐาน : ( รองรับไฟล์ .jpg .png .pdf เท่านั้น )</b></label><br>
                                <div id="showFileEdit" class="row mt-3"></div>
                                <input id="ipe-file_name" name="ipe-file_name[]" type="file" class="file" multiple data-show-upload="false" data-show-caption="true" data-show-preview="true" accept=".pdf,image/*" required>
                            </div>
                            <div id="scripts2"><script type="application/javascript" defer :src="this.baseurl+`assets/js/bs-filestyle.js`"></script></div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>ผู้แจ้ง</b></label>
                                <input type="text" id="ipe-user_inform" name="ipe-user_inform" class="form-control" readonly>
                            </div>
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" id="ipe-ecode_inform" name="ipe-ecode_inform" class="form-control" readonly>
                            </div>
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" id="ipe-dept_inform" name="ipe-dept_inform" class="form-control" readonly>
                                <input hidden type="text" id="ipe-deptcode_inform" name="ipe-deptcode_inform" class="form-control">
                            </div>
                        </div>
                        <hr>

                        <div class="row form-group text-center">
                            <div class="col-md-12 col-sm-12 form-group">
                                <button type="submit" id="btn-saveEdit" name="btn-saveEdit" class="btn btn-info m-2 btnAdd"><i class="dw dw-diskette1 mr-2"></i>บันทึกการแก้ไข</button>
                                <!-- <button type="submit" id="btn-send" name="btn-send" class="btn btn-success btnAdd" disabled>ส่งข้อมูล</button> -->
                            </div>
                        </div>

                        <hr>


                    </div>
                </div>
            </div>
            </form>

          </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name:"Edit",
    data() {
        return {
            url:this.getUrl(),
            baseurl:this.baseUrl(),
            userData:[],
            acciTypeData:null,
            type1value:null,
            fileData:[]
        }
    },
    components:{
    },
    beforeCreate() {
        
    },
    created() {
        $('#scripts2').load(' #scripts2');
        console.log('created');
        this.getAccidentType();
        this.formValidate();
    },
    mounted() {
        const proxy = this;
        this.getDatetimePicker();
        this.getUserData();

        $(document).on('change' , 'input[name="ipe-type1"]' , function(){
            console.log($(this).val());
            if($(this).val() != ""){
                proxy.type1value = $(this).val();
            }
            $('#ipe-acci_name , #ipe-acci_ecode , #ipe-acci_dept , #ipe-acci_deptcode , #ipe-acci_carno , #ipe-acci_res').val('');
        });

        $(document).on('change' , '#ipe-type3' , function(){
            console.log($(this).val());
            if($(this).val() != "ยานพาหนะ"){
                $('.div_carno_e').hide();
            }else{
                $('.div_carno_e').show();
            }
            $('#ipe-acci_carno').val('');
        });


        $(document).on('keyup' , '#ipe-acci_name' , function(){
            // Check type1value
            if(proxy.type1value === null){
                Swal.fire({
                    title: 'กรุณาเลือก หัวข้อ การเกิดขึ้นของอุบัติเหตุ ก่อน',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:4000
                });
                $(this).val('');
            }else{
                if(proxy.type1value == "บุคคลภายในบริษัท"){
                    if($(this).val() != ""){
                        proxy.getEmployeeData();
                    }else{
                        $('#showEmployeeData').html('');
                    }
                    
                }
            }


        });

        $(document).on('click' , '.selectUserInformLi' , function(){
            const data_name = $(this).attr('data_name');
            const data_emcode = $(this).attr('data_emcode');
            const data_DeptCode = $(this).attr('data_DeptCode');
            const data_Dept = $(this).attr('data_Dept');
            const data_positionname = $(this).attr('data_positionname');

            $('#ipe-acci_name').val(data_name);
            $('#ipe-acci_ecode').val(data_emcode);
            $('#ipe-acci_dept').val(data_Dept);
            $('#ipe-acci_deptcode').val(data_DeptCode);
            $('#ipe-acci_res').val(data_positionname);

            $('#showEmployeeData').html('');
        });

        $(document).on('click' , '.del-File-i' , function(){
            const data_file_autoid = $(this).attr('data_file_autoid');
            const data_file_path = $(this).attr('data_file_path');
            const data_file_name = $(this).attr('data_file_name');
            const data_formno = $(this).attr('data_formno');

            console.log(data_file_autoid);
            Swal.fire({
                title: 'ต้องการลบรูปนี้ใช่หรือไม่',
                icon: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText:'ยกเลิก'
            }).then(res=>{
                console.log(res);
                if(res.value == true){
                    proxy.deleteFileEdit(data_file_autoid , data_file_path , data_file_name , data_formno);
                }
            });
        })


    },
    beforeMount(){
        
    },
    updated() {
        console.log('update');
    },
    methods: {
        getDatetimePicker(){
            $('#ipe-acci_datetime').Zebra_DatePicker({
        	    format: 'Y-m-d H:i'
    	    });
        },
        getUserData(){
            this.userData = localStorage.getItem('userData');
            this.userData = JSON.parse(this.userData);

            $('#ipe-user_inform').val(this.userData.Fname+' '+this.userData.Lname);
            $('#ipe-ecode_inform').val(this.userData.ecode);
            $('#ipe-dept_inform').val(this.userData.Dept);
            $('#ipe-deptcode_inform').val(this.userData.DeptCode);
        },
        getAccidentType(){
            const proxy = this;
            axios.post(this.url+'intsys/rao/rao_backend/api/getAccidentType',{
                action:"getAccidentType"
            }).then(res=>{
                this.acciTypeData = res.data.result;
                console.log(this.acciTypeData);
                proxy.getViewDataForEdit();
            });
        },
        saveDataMainEdit(){

            const proxy = this;

            if($('#ipe-acci_datetime').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกวันที่เกิดเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-acci_location').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุสถานที่เกิดเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('input[name="ipe-type1"]:checked').length == 0){
                Swal.fire({
                    title: 'กรุณาเลือกการเกิดขึ้นของอุบัติเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('input[name="ipe-type2"]:checked').length == 0){
                Swal.fire({
                    title: 'กรุณาระบุหมวดหมู่',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-type3').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกประเภทของอุบัติเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-acci_name').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุชื่อผู้ประสบเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-acci_res').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุตำแหน่งหน้าที่หรือความรับผิดชอบ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-acci_detail').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุรายละเอียด',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{

                $('#btn-saveEdit').prop('disabled' , true);
                const form = $('#mainformEdit')[0];
                const data = new FormData(form);

                axios.post(this.url+'intsys/rao/rao_backend/api/api_saveDataMainEdit' , data , {
                    header:{
                        'Content-Type' : 'multipart/form-data'
                    },
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Update Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push(`/viewdata/${res.data.formno}`);
                        });
                        
                    }else{
                        $('#btn-saveEdit').prop('disabled' , false);
                    }
                });
            }



        },
        getEmployeeData()
        {
            let inputSearch = $('#ipe-acci_name').val();
            axios.post(this.url+'intsys/rao/rao_backend/api/getEmployeeData' , {
                action:"getEmployeeData",
                inputSearch:inputSearch
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let userResult = res.data.result;
                    let html = `
                    <ul class="list-group mt-2 selectUserInform">
                    `;

                    for(let i = 0; i < userResult.length; i++){
                        html +=`
                            <li class="list-group-item list-group-item list-group-item-action selectUserInformLi"
                                data_name="`+userResult[i].FnameT+` `+userResult[i].LnameT+`"
                                data_emcode="`+userResult[i].emcode+`"
                                data_DeptCode="`+userResult[i].DeptCode+`"
                                data_Dept="`+userResult[i].Dept+`"
                                data_positionname="`+userResult[i].PositionName+`"
                            >
                            <b>ชื่อ-สกุล : </b>`+userResult[i].FnameT+` `+userResult[i].LnameT+`&nbsp<b>รหัสพนักงาน : </b>`+userResult[i].emcode+`
                            </li>
                        `;
                    }                
                    html +=`
                    </ul>`;
                    $('#showEmployeeData').html(html);
                }
            });
        },
        getViewDataForEdit(){
            axios.post(this.url+'intsys/rao/rao_backend/api/api_getViewData/',{
                action:'getViewData',
                formno:this.$route.params.id
            }).then(res=>{
                console.log(res.data);
                const proxy = this;
                if(res.data.status == "Select Data Success"){

                    let viewFullData = res.data.result;
                    proxy.fileData = res.data.result_file;

                    $('#ipe-acci_datetime').val(viewFullData.m_acci_datetime);
                    $('#ipe-acci_location').val(viewFullData.m_acci_location);

                    if(viewFullData.m_type1 == "บุคคลภายในบริษัท"){
                        $('#ipe-type1-1').prop('checked' , true);
                    }else if(viewFullData.m_type1 == "บุคคลภายนอกบริษัท"){
                        $('#ipe-type1-2').prop('checked' , true);
                    }

                    proxy.type1value = viewFullData.m_type1;

                    if(viewFullData.m_type2 == "asset"){
                        $('#ipe-type2-1').prop('checked' ,true);
                    }else if(viewFullData.m_type2 == "man"){
                        $('#ipe-type2-2').prop('checked' ,true);
                    }

                    if(viewFullData.m_acci_cardno === null){
                        viewFullData.m_acci_cardno = "";
                    }

                    if(viewFullData.m_type3 != "ยานพาหนะ"){
                        $('.div_carno_e').hide();
                    }

                    $('#ipe-type3 option[value="'+viewFullData.m_type3+'"]').prop('selected' , true);
                    $('#ipe-acci_name').val(viewFullData.m_acci_name);
                    $('#ipe-acci_ecode').val(viewFullData.m_acci_ecode);
                    $('#ipe-acci_dept').val(viewFullData.m_acci_dept);
                    $('#ipe-acci_deptcode').val(viewFullData.m_acci_deptcode);
                    $('#ipe-acci_cardno').val(viewFullData.m_acci_cardno);
                    $('#ipe-acci_carno').val(viewFullData.m_acci_carno);
                    $('#ipe-acci_res').val(viewFullData.m_acci_res);
                    $('#ipe-acci_detail').val(viewFullData.m_acci_detail);
                    $('#ipe-user_inform').val(viewFullData.m_user_inform);
                    $('#ipe-ecode_inform').val(viewFullData.m_ecode_inform);
                    $('#ipe-dept_inform').val(viewFullData.m_dept_inform);


                    proxy.loadFileData(proxy.fileData , this.$route.params.id);

                    // console.log(viewFullData);

                }

            });
        },
        loadFileData(fileData , formno)
        {
            const proxy = this;
            // check Image
            if(fileData.length != 0){
                let html = ``;
                for(let i = 0 ; i < fileData.length ; i++){
                    let fileExt = fileData[i].file_name.split('.').pop().toLowerCase();
                    console.log(fileData[i].file_name.split('.').pop().toLowerCase());
                    if(fileExt == "jpg" || fileExt == "png" || fileExt == "jpeg"){
                        html += `
                        <div class="col-md-4 col-lg-2 col-6 div-imageShow form-group">
                            <a class="a-imageShow" href="`+proxy.url+`intsys/rao/rao_backend/`+fileData[i].file_path+fileData[i].file_name+`" target="_blank">
                                <img class="imageShow" src="`+proxy.url+`intsys/rao/rao_backend/`+fileData[i].file_path+fileData[i].file_name+`">
                            </a>
                            <a class="a-imageShow" href="`+proxy.url+`intsys/rao/rao_backend/`+fileData[i].file_path+fileData[i].file_name+`" target="_blank"><b>`+fileData[i].file_name+`</b></a>
                            <i class="dw dw-cancel del-File-i"
                                data_file_autoid="`+fileData[i].file_autoid+`"
                                data_file_path="`+fileData[i].file_path+`"
                                data_file_name="`+fileData[i].file_name+`"
                                data_formno="`+formno+`"
                            ></i>
                        </div>
                        `;
                    }else{
                        html += `
                        <div class="col-md-4 col-lg-2 col-6 div-imageShow form-group">
                                <iframe src="`+proxy.url+`intsys/rao/rao_backend/`+fileData[i].file_path+fileData[i].file_name+`" height="200" width="100%"></iframe>
                                <a class="a-imageShow" href="`+proxy.url+`intsys/rao/rao_backend/`+fileData[i].file_path+fileData[i].file_name+`" target="_blank"><b>`+fileData[i].file_name+`</b></a>
                                <i class="dw dw-cancel del-File-i"
                                    data_file_autoid="`+fileData[i].file_autoid+`"
                                    data_file_path="`+fileData[i].file_path+`"
                                    data_file_name="`+fileData[i].file_name+`"
                                    data_formno="`+formno+`"
                            ></i>
                        </div>
                        `;
                    }
                }

                $('#showFileEdit').html(html);
            }else{
                $('#showFileEdit').html('');
            }
        },
        deleteFileEdit(file_autoid , file_path , file_name , file_formno)
        {
            const proxy = this;
            if(file_autoid != ""){
                axios.post(proxy.url+'intsys/rao/rao_backend/api/api_deleteFile' , {
                    action:"deleteFileEdit",
                    file_autoid:file_autoid,
                    file_path:file_path,
                    file_name:file_name,
                    file_formno:file_formno
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Delete Data Success"){
                       proxy.loadFileData(res.data.result , file_formno);
                    }
                });
            }
        }

        
    },
}
</script>

<style scope>
    .btnAdd{
        width:200px;
    }
    .div-imageShow{
        position:relative;
    }
    .del-File-i{
        position:absolute;
        color:rgb(186, 9, 9);
        font-size:20px;
        font-weight:600;
        top:-15px;
        right:2px;
        transition:transform .2s;
    }
    .del-File-i:hover{
        transform:scale(1.2);
        cursor:pointer;
    }
</style>