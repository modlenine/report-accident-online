<template>
  <div id="add">

    <div class="main-container">
          <div class="pd-ltr-20">

            <form id="mainform" @submit.prevent="saveDataMain" class="needs-validation" novalidate autocomplete="off">
            <div class="row">
                <div class="col-xl-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                        <div class="mt-3"></div>
                        <h3 class="text-center">ฟอร์มแจ้งอุบัติเหตุ</h3>
                        <hr>

                        <div class="row form-group">
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>วันที่เกิดเหตุ</b></label>
                                <input type="text" name="ip-acci_datetime" id="ip-acci_datetime" class="form-control" required>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>สถานที่เกิดเหตุ</b></label>
                                <input type="text" name="ip-acci_location" id="ip-acci_location" class="form-control" required>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>การเกิดขึ้นของอุบัติเหตุ ( เกิดจาก )</b></label>
                                <div class="custom-control custom-radio mb-5">
                                <input type="radio" class="custom-control-input ip-type1" name="ip-type1" id="ip-type1-1" value="บุคคลภายในบริษัท" required>
                                    <label class="custom-control-label" for="ip-type1-1">บุคคลภายในบริษัท</label>
                                </div>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" class="custom-control-input ip-type1" name="ip-type1" id="ip-type1-2" value="บุคคลภายนอกบริษัท" required>
                                    <label class="custom-control-label" for="ip-type1-2">บุคคลภายนอกบริษัท</label>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-12">
                                <label class="weight-600">หมวดหมู่</label>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" id="ip-type2-1" name="ip-type2" class="custom-control-input ip-type2" value="asset" required>
                                    <label class="custom-control-label" for="ip-type2-1">Asset</label>
                                </div>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" id="ip-type2-2" name="ip-type2" class="custom-control-input ip-type2" value="man" required>
                                    <label class="custom-control-label" for="ip-type2-2">Man</label>
                                </div>
                            </div>

                        </div>

                        <div class="row form-group">
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>ประเภทของอุบัติเหตุ</b></label>
                                <select name="ip-type3" id="ip-type3" class="form-control" required >
                                    <option value="">กรุณาเลือกประเภท</option>
                                    <option :value="acciTypeDatas.type_name" v-for="acciTypeDatas in acciTypeData" :key="acciTypeDatas.id">{{acciTypeDatas.type_name}} ( {{acciTypeDatas.type_description}} )</option>
                                </select>
                            </div>
                        </div>

                        <div class="row form-group">

                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ชื่อผู้ประสบเหตุ / ผู้ที่เกี่ยวข้อง</b></label>
                                <input type="text" name="ip-acci_name" id="ip-acci_name" class="form-control" required>
                                <div id="showEmployeeData"></div>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group" v-if="this.type1value != 'บุคคลภายนอกบริษัท'">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" name="ip-acci_ecode" id="ip-acci_ecode" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group" v-if="this.type1value != 'บุคคลภายนอกบริษัท'">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" name="ip-acci_dept" id="ip-acci_dept" class="form-control" readonly>
                                <input hidden type="text" name="ip-acci_deptcode" id="ip-acci_deptcode">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group" v-if="this.type1value != 'บุคคลภายในบริษัท'">
                                <label for=""><b>เลขบัตรประจำตัวประชาชน</b></label>
                                <input type="text" name="ip-acci_cardno" id="ip-acci_cardno" class="form-control">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group" v-if="this.type3value == 'ยานพาหนะ' ">
                                <label for=""><b>ทะเบียนรถ</b></label>
                                <input type="text" name="ip-acci_carno" id="ip-acci_carno" class="form-control">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ตำแหน่ง / หน้าที่ความรับผิดชอบ</b></label>
                                <input type="text" name="ip-acci_res" id="ip-acci_res" class="form-control" required>
                            </div>
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>รายละเอียด</b></label>
                                <textarea name="ip-acci_detail" id="ip-acci_detail" cols="30" rows="10" class="form-control" required></textarea>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12 col-sm-12">
                                <label><b>แนบหลักฐาน : ( รองรับไฟล์ .jpg .png .pdf เท่านั้น )</b></label><br>
                                <input id="ip-file_name" name="ip-file_name[]" type="file" class="file" multiple data-show-upload="false" data-show-caption="true" data-show-preview="true" accept=".pdf,image/*" required>
                            </div>
                            <div id="scripts"><script type="application/javascript" defer src="assets/js/bs-filestyle.js"></script></div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>ผู้แจ้ง</b></label>
                                <input type="text" id="ip-user_inform" name="ip-user_inform" class="form-control" readonly>
                            </div>
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" id="ip-ecode_inform" name="ip-ecode_inform" class="form-control" readonly>
                            </div>
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" id="ip-dept_inform" name="ip-dept_inform" class="form-control" readonly>
                                <input hidden type="text" id="ip-deptcode_inform" name="ip-deptcode_inform" class="form-control">
                            </div>
                        </div>
                        <hr>

                        <div class="row form-group text-center">
                            <div class="col-md-12 col-sm-12 form-group">
                                <button type="submit" id="btn-save" name="btn-save" class="btn btn-info m-2 btnAdd"><i class="dw dw-diskette1 mr-2"></i>บันทึก</button>
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
import Swal from 'sweetalert2';

export default {
    name:"Add",
    data() {
        return {
            url:this.getUrl(),
            userData:[],
            acciTypeData:null,
            type1value:null,
            type3value:null
        }
    },
    components:{
    },
    beforeCreate() {
        
    },
    created() {
        $('#scripts').load(' #scripts');
        console.log('created');
        this.getAccidentType();
        this.formValidate();
    },
    mounted() {
        const proxy = this;
        this.getDatetimePicker();
        this.getUserData();

        $(document).on('change' , 'input[name="ip-type1"]' , function(){
            console.log($(this).val());
            if($(this).val() != ""){
                proxy.type1value = $(this).val();
            }
            $('#ip-acci_name , #ip-acci_ecode , #ip-acci_dept , #ip-acci_deptcode , #ip-acci_carno , #ip-acci_res').val('');
        });

        $(document).on('change' , '#ip-type3' , function(){
            console.log($(this).val());
            if($(this).val() != ""){
                proxy.type3value = $(this).val();
            }
            $('#ip-ip-acci_carno').val('');
        });


        $(document).on('keyup' , '#ip-acci_name' , function(){
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

            $('#ip-acci_name').val(data_name);
            $('#ip-acci_ecode').val(data_emcode);
            $('#ip-acci_dept').val(data_Dept);
            $('#ip-acci_deptcode').val(data_DeptCode);
            $('#ip-acci_res').val(data_positionname);

            $('#showEmployeeData').html('');
        });
    },
    beforeMount(){

    },
    updated() {
        console.log('update');
    },
    methods: {
        getDatetimePicker(){
            $('#ip-acci_datetime').Zebra_DatePicker({
        	    format: 'Y-m-d H:i'
    	    });
        },

        getUserData(){
            this.userData = localStorage.getItem('userData');
            this.userData = JSON.parse(this.userData);

            $('#ip-user_inform').val(this.userData.Fname+' '+this.userData.Lname);
            $('#ip-ecode_inform').val(this.userData.ecode);
            $('#ip-dept_inform').val(this.userData.Dept);
            $('#ip-deptcode_inform').val(this.userData.DeptCode);
        },
        getAccidentType(){
            axios.post(this.url+'intsys/rao/rao_backend/api/getAccidentType',{
                action:"getAccidentType"
            }).then(res=>{
                this.acciTypeData = res.data.result;
                console.log(this.acciTypeData);
            });
        },
        saveDataMain(){

            const proxy = this;

            if($('#ip-acci_datetime').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกวันที่เกิดเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-acci_location').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุสถานที่เกิดเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('input[name="ip-type1"]:checked').length == 0){
                Swal.fire({
                    title: 'กรุณาเลือกการเกิดขึ้นของอุบัติเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('input[name="ip-type2"]:checked').length == 0){
                Swal.fire({
                    title: 'กรุณาระบุหมวดหมู่',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-type3').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกประเภทของอุบัติเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-acci_name').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุชื่อผู้ประสบเหตุ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-acci_res').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุตำแหน่งหน้าที่หรือความรับผิดชอบ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-acci_detail').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุรายละเอียด',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{

                $('#btn-save').prop('disabled' , true);
                const form = $('#mainform')[0];
                const data = new FormData(form);

                axios.post(this.url+'intsys/rao/rao_backend/api/api_saveDataMain' , data , {
                    header:{
                        'Content-Type' : 'multipart/form-data'
                    },
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Insert Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push(`/viewdata/${res.data.formno}`);
                        });
                        
                    }else{
                        $('#btn-save').prop('disabled' , false);
                    }
                });
            }



        },
        getEmployeeData()
        {
            let inputSearch = $('#ip-acci_name').val();
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
        }

        
    },
}
</script>

<style scope>
    .btnAdd{
        width:150px;
    }
</style>