<template>

  <div id="viewdata">
    <div>
        <!-- <EditDataModal
            :onsite_no="this.onsite_no"
            :currentDateTime="this.currentDateTime"
            :userinform="this.userinform"
        />
        <CancelDataModal
            :onsite_no="this.onsite_no"
            :userdata="this.userData"
        /> -->
    </div>
        <div class="main-container">
          <div class="pd-ltr-20">

            <div class="row">
                <div class="col-xl-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                        <div class="textStatus"></div>
                        <div class="mt-3"></div>
                        <h3 class="text-center">ฟอร์มแจ้งอุบัติเหตุ</h3>
                        <h5 class="text-center mt-2"><b>เอกสารเลขที่ : </b>{{this.$route.params.id}}</h5>
                        <hr>

                        <div class="row form-group">
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>วันที่เกิดเหตุ</b></label>
                                <input type="text" name="ipv-acci_datetime" id="ipv-acci_datetime" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>สถานที่เกิดเหตุ</b></label>
                                <input type="text" name="ipv-acci_location" id="ipv-acci_location" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>การเกิดขึ้นของอุบัติเหตุ ( เกิดจาก )</b></label>
                                <div class="custom-control custom-radio mb-5">
                                <input type="radio" class="custom-control-input ipv-type1" name="ipv-type1" id="ipv-type1-1" @click.prevent>
                                    <label class="custom-control-label" for="ipv-type1-1">บุคคลภายในบริษัท</label>
                                </div>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" class="custom-control-input ipv-type1" name="ipv-type1" id="ipv-type1-2"  @click.prevent>
                                    <label class="custom-control-label" for="ipv-type1-2">บุคคลภายนอกบริษัท</label>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-12">
                                <label class="weight-600">หมวดหมู่</label>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" id="ipv-type2-1" name="ipv-type2" class="custom-control-input ipv-type2" @click.prevent>
                                    <label class="custom-control-label" for="ipv-type2-1">Asset</label>
                                </div>
                                <div class="custom-control custom-radio mb-5">
                                    <input type="radio" id="ipv-type2-2" name="ipv-type2" class="custom-control-input ipv-type2" @click.prevent>
                                    <label class="custom-control-label" for="ipv-type2-2">Man</label>
                                </div>
                            </div>

                        </div>

                        <div class="row form-group">
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>ประเภทของอุบัติเหตุ</b></label>
                                <input type="text" name="ipv-type3" id="ipv-type3" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row form-group">

                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ชื่อผู้ประสบเหตุ / ผู้ที่เกี่ยวข้อง</b></label>
                                <input type="text" name="ipv-acci_name" id="ipv-acci_name" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group div_ecode">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" name="ipv-acci_ecode" id="ipv-acci_ecode" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group div_dept">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" name="ipv-acci_dept" id="ipv-acci_dept" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group div_cardno">
                                <label for=""><b>เลขบัตรประจำตัวประชาชน</b></label>
                                <input type="text" name="ipv-acci_cardno" id="ipv-acci_cardno" class="form-control">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group div_carno">
                                <label for=""><b>ทะเบียนรถ</b></label>
                                <input type="text" name="ipv-acci_carno" id="ipv-acci_carno" class="form-control">
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ตำแหน่ง / หน้าที่ความรับผิดชอบ</b></label>
                                <input type="text" name="ipv-acci_res" id="ipv-acci_res" class="form-control" readonly>
                            </div>
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>รายละเอียด</b></label>
                                <textarea name="ipv-acci_detail" id="ipv-acci_detail" cols="30" rows="10" class="form-control" readonly></textarea>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12 col-sm-12">
                                <label><b>แนบหลักฐาน : ( รองรับไฟล์ .jpg .png .pdf เท่านั้น )</b></label><br>
                                <div id="showFile" class="row"></div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>ผู้แจ้ง</b></label>
                                <input type="text" id="ipv-user_inform" name="ipv-user_inform" class="form-control" readonly>
                            </div>
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" id="ipv-ecode_inform" name="ipv-ecode_inform" class="form-control" readonly>
                            </div>
                            <div class="col-md-4 col-sm-12 form-group">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" id="ipv-dept_inform" name="ipv-dept_inform" class="form-control" readonly>
                            </div>
                        </div>
                        <hr>

                        <div class="row form-group text-center div_btnZoneV" v-if="this.displayBtnZone == true">
                            <div class="col-md-12 col-sm-12 form-group">
                                <button type="button" id="btn-send" name="btn-send" class="btn btn-info m-2 btnAdd" @click="sendData"><i class="dw dw-email mr-2"></i>ส่งข้อมูล</button>
                                <router-link 
                                    :to="`/edit/${this.acci_formno}`"
                                >
                                    <button type="submit" id="btn-edit" name="btn-edit" class="btn btn-warning m-2 btnAdd"><i class="dw dw-edit-1 mr-2"></i>แก้ไขข้อมูล</button>
                                </router-link>
                                <button type="button" id="btn-cancel" name="btn-cancel" class="btn btn-danger m-2 btnAdd" @click="canCelDoc"><i class="dw dw-trash mr-2"></i>ยกเลิกเอกสาร</button>
                            </div>
                        </div>

                        <hr class="div_btnZoneV" v-if="this.displayBtnZone == true">


                    </div>
                </div>
            </div>

            <div v-if="this.displayMgrZone == true">
                <MgrPage
                    :mgrUserData="this.userData"
                />
            </div>

            <div v-if="this.displayOhsZone == true">
                <OhsPage
                    :ohsUserData="this.userData"
                    :ohsFormno="this.acci_formno"
                    :ohsStatus="this.acci_status"
                />
            </div>


          </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

import MgrPage from '@/views/Mgr.vue';
import OhsPage from '@/views/Ohs.vue';

// import CancelDataModal from '@/components/CancelDataModal.vue';
// import History from '@/components/History.vue';

export default {
    name:'Viewdata',
    data() {
        return {
            url:this.getUrl(),
            acci_formno:this.$route.params.id,
            viewDataForEdit:[],
            viewDataForEdit_file:[],
            type1valueV:null,
            type3valueV:null,
            userData:[],
            displayBtnZone:false,
            displayMgrZone:false,
            displayOhsZone:false,
            acci_status:''
        }
    },
    components:{
        MgrPage,
        OhsPage
    },
    created() {
        this.getViewData();
        this.getUserData();
    },
    mounted() {
        const proxy = this;
        proxy.getDatePicker();
    },
    methods: {
        getDatePicker(){
            $('#ipv-ownerdate').Zebra_DatePicker({
        	    format: 'Y-m-d H:i',
    	    });
        },
        getViewData(){
            axios.post(this.url+'intsys/rao/rao_backend/api/api_getViewData/',{
                action:'getViewData',
                formno:this.$route.params.id
            }).then(res=>{
                console.log(res.data);
                const proxy = this;
                if(res.data.status == "Select Data Success"){

                    let viewFullData = res.data.result;
                    let fileData = res.data.result_file;
                    let condateInform = moment(viewFullData.m_acci_datetime).format('DD/MM/Y HH:mm:ss');

                    proxy.acci_status = viewFullData.m_status;

                    $('#ipv-acci_datetime').val(condateInform).prop('readonly' , true);
                    $('#ipv-acci_location').val(viewFullData.m_acci_location).prop('readonly' , true);

                    let textStatus = `<span><b>Status : </b>`+viewFullData.m_status+`</span>`;
                    $('.textStatus').html(textStatus);

                    if(viewFullData.m_type1 == "บุคคลภายในบริษัท"){
                        $('#ipv-type1-1').prop('checked' , true);
                        $('.div_cardno').hide();
                    }else if(viewFullData.m_type1 == "บุคคลภายนอกบริษัท"){
                        $('#ipv-type1-2').prop('checked' , true);
                        $('.div_ecode , .div_dept').hide();
                    }

                    if(viewFullData.m_type2 == "asset"){
                        $('#ipv-type2-1').prop('checked' ,true);
                    }else if(viewFullData.m_type2 == "man"){
                        $('#ipv-type2-2').prop('checked' ,true);
                    }

                    if(viewFullData.m_acci_cardno === null){
                        viewFullData.m_acci_cardno = "";
                    }

                    if(viewFullData.m_type3 != "ยานพาหนะ"){
                        $('.div_carno').hide();
                    }


                    $('#ipv-type3').val(viewFullData.m_type3).prop('readonly' , true);
                    $('#ipv-acci_name').val(viewFullData.m_acci_name).prop('readonly' , true);
                    $('#ipv-acci_ecode').val(viewFullData.m_acci_ecode).prop('readonly' , true);
                    $('#ipv-acci_dept').val(viewFullData.m_acci_dept).prop('readonly' , true);
                    $('#ipv-acci_cardno').val(viewFullData.m_acci_cardno).prop('readonly' , true);
                    $('#ipv-acci_carno').val(viewFullData.m_acci_carno).prop('readonly' , true);
                    $('#ipv-acci_res').val(viewFullData.m_acci_res).prop('readonly' , true);
                    $('#ipv-acci_detail').val(viewFullData.m_acci_detail).prop('readonly' , true);
                    $('#ipv-user_inform').val(viewFullData.m_user_inform).prop('readonly' , true);
                    $('#ipv-ecode_inform').val(viewFullData.m_ecode_inform).prop('readonly' , true);
                    $('#ipv-dept_inform').val(viewFullData.m_dept_inform).prop('readonly' , true);

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
                                </div>
                                `;
                            }else{
                                html += `
                                <div class="col-md-4 col-lg-2 col-6 div-imageShow form-group">
                                        <iframe src="`+proxy.url+`intsys/rao/rao_backend/`+fileData[i].file_path+fileData[i].file_name+`" height="200" width="100%"></iframe>
                                        <a class="a-imageShow" href="`+proxy.url+`intsys/rao/rao_backend/`+fileData[i].file_path+fileData[i].file_name+`" target="_blank"><b>`+fileData[i].file_name+`</b></a>
                                </div>
                                `;
                            }
                        }

                        $('#showFile').html(html);
                    }

                    // console.log(viewFullData);

                    // proxy.checkPermissionByEcode(proxy.userData.ecode , viewFullData.m_ecode_inform);
                    proxy.checkDocStatus(viewFullData.m_status , proxy.userData.ecode , viewFullData.m_ecode_inform);

                    if(viewFullData.m_status == "Open"){
                        if(viewFullData.m_deptcode_inform == proxy.userData.DeptCode && proxy.userData.DeptCode > 65){
                            this.displayMgrZone = true;
                        }else if(viewFullData.m_deptcode_inform == 1007){
                            if(proxy.userData.ecode == "M0040"){
                                this.displayMgrZone = true;
                            }
                        }
                    }else if(viewFullData.m_status == "User Cancel"){
                        this.displayMgrZone = false;
                        this.displayOhsZone = false;
                    }else if(viewFullData.m_status == "Manager Approved"){
                        this.displayMgrZone = true;
                        if(proxy.userData.ecode == "M0004"){
                            this.displayOhsZone = true;
                        }
                    }else if(viewFullData.m_status == "Manager Not Approve"){
                        this.displayMgrZone = true;
                    }else if(viewFullData.m_status == "OHS Approved"){
                        this.displayMgrZone = true;
                        this.displayOhsZone = true;
                        $('#btn-createComplaint').prop('disabled' , 'false');
                    }else if(viewFullData.m_status == "OHS Not Approve"){
                        this.displayMgrZone = true;
                        this.displayOhsZone = true;
                    }else if(viewFullData.m_status == "OHS Reject"){
                        this.displayMgrZone = true;
                        this.displayOhsZone = true;
                    }else if(viewFullData.m_status == "Complete"){
                        this.displayMgrZone = true;
                        this.displayOhsZone = true;
                        $('#btn-createComplaint').css('display' , 'none');
                    }

                }

            });
        },
        checkPermissionByEcode(loginEcode , ecodeInform)
        {
            console.log(loginEcode);
            console.log(ecodeInform);
            if(loginEcode == ecodeInform){
                this.displayBtnZone = true;
            }
        },
        checkDocStatus(status , loginEcode , ecodeInform){
            if(status == "User Cancel"){
                this.displayBtnZone = false;
            }else if(status == "Open" || status == "Manager Approved" || status == "Manager Not Approve" || status == "OHS Approved" || status == "OHS Not Approve" || status == "Complete"){
                this.displayBtnZone = false;
            }else if(status == "OHS Reject"){
                this.checkPermissionByEcode(loginEcode , ecodeInform)
            }else{
                this.checkPermissionByEcode(loginEcode , ecodeInform)
            }
        },
        getUserData(){
            this.userData = localStorage.getItem('userData');
            this.userData = JSON.parse(this.userData);
        },
        canCelDoc()
        {
            const proxy = this;
            Swal.fire({
                title: 'ต้องการยกเลิกเอกสารนี้ใช่หรือไม่',
                icon: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText:'ยกเลิก'
            }).then(res=>{
                console.log(res);
                if(res.value == true){
                    axios.post(this.url+'intsys/rao/rao_backend/api/api_canCelDoc',{
                        action:"api_canCelDoc",
                        formno:this.acci_formno
                    }).then(res=>{
                        console.log(res.data);
                        if(res.data.status == "Cancel Document Success"){
                            Swal.fire({
                                title: 'ยกเลิกเอกสารฉบับนี้สำเร็จ',
                                icon: 'success',
                                showConfirmButton: false,
                                timer:1000
                            }).then(function(){
                                proxy.getViewData();
                            });
                        }
                    });
                }
            });
        },
        sendData()
        {
            $('#btn-send').prop('disabled' , true);
            const proxy = this;
            Swal.fire({
                title: 'ท่านต้องการส่งข้อมูลไปยังผู้จัดการเพื่อทำการอนุมัติ ใช่หรือไม่',
                icon: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText:'ยกเลิก'
            }).then(res=>{
                if(res.value == true){
                    axios.post(this.url+'intsys/rao/rao_backend/api/api_sendData' , {
                        action:"api_sendData",
                        formno:this.acci_formno
                    }).then(res=>{
                        console.log(res.data);
                        if(res.data.status == "Send Data Success"){
                            Swal.fire({
                                title: 'ส่งข้อมูลเรียบร้อย',
                                icon: 'success',
                                showConfirmButton: false,
                                timer:1000
                            }).then(function(){
                                proxy.$router.push(`/list`);
                            });
                        }
                    });
                }else{
                    $('#btn-send').prop('disabled' , false);
                }
            })


        }

    },
}
</script>

<style>
    .Zebra_DatePicker_Icon_Wrapper{
        width:100% !important;
    }
    .imageShow{
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 15px !important;
    }
    .textStatus{
        position:absolute;
        top:15px;
        right:30px;
    }
</style>