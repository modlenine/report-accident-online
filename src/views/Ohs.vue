<template>
  <div id="ohs">
    <form id="frm-saveOhs" @submit.prevent="saveOhs" autocomplete="off" class="needs-validation" novalidate>
    <div class="row">
        <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
                <h3 class="text-center">สำหรับ จป.</h3>
                <div class="mt-3"></div>
                <div class="row form-group">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 form-group">
                                    <div class="row">
                                        <div class="col-lg-12 form-inline">
                                            <div class="custom-control custom-radio mb-5 ml-3">
                                                <input type="radio" id="ip-acci-ohsappro-yes" name="ip-acci-ohsappro" value="อนุมัติ" class="custom-control-input" required> 
                                                <label for="ip-acci-ohsappro-yes" class="custom-control-label">อนุมัติ</label>
                                            </div> 
                                            <div class="custom-control custom-radio mb-5 ml-3">
                                                <input type="radio" id="ip-acci-ohsappro-no" name="ip-acci-ohsappro" value="ไม่อนุมัติ" class="custom-control-input" required> 
                                                <label for="ip-acci-ohsappro-no" class="custom-control-label">ไม่อนุมัติ</label>
                                            </div>
                                            <div class="custom-control custom-radio mb-5 ml-3">
                                                <input type="radio" id="ip-acci-ohsappro-reject" name="ip-acci-ohsappro" value="แจ้งแก้ไข" class="custom-control-input" required> 
                                                <label for="ip-acci-ohsappro-reject" class="custom-control-label">แจ้งแก้ไข</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for=""><b>หมายเหตุ</b></label>
                                <textarea name="ip-acci-ohsappro-memo" id="ip-acci-ohsappro-memo" cols="30" rows="10" class="form-control" style="height:100px"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <label for=""><b>ผู้อนุมัติ</b></label>
                                <input type="text" name="ip-acci-ohsappro-user" id="ip-acci-ohsappro-user" class="form-control" readonly>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for=""><b>ฝ่าย</b></label>
                                <input type="text" name="ip-acci-ohsappro-dept" id="ip-acci-ohsappro-dept" class="form-control" readonly>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for=""><b>ลงวันที่</b></label>
                                <input type="text" name="ip-acci-ohsappro-datetime" id="ip-acci-ohsappro-datetime" class="form-control" readonly>
                            </div>
                        </div>
                    </div>
                </div>

                <input hidden type="text" name="ip-acci-ohsappro-formno" id="ip-acci-ohsappro-formno">

                <div class="row form-group">
                    <div class="col-lg-12 text-center">
                        <button type="submit" id="btn-ohsSave" name="btn-ohsSave" class="btn btn-success btn-ohs"><i class="dw dw-diskette1 mr-2"></i>บันทึกข้อมูล</button>
                        <a v-if="this.ohsStatus === 'OHS Approved' || this.ohsStatus === 'Complete'" :href="this.url+'intsys/rao/rao_backend/api/api_printDocument/'+this.ohsFormno" target="_blank"><button type="button" id="btn-printDocument" name="btn-printDocument" class="btn btn-warning btn-ohs ml-3"><i class="dw dw-upload mr-2"></i>ปริ้นเอกสาร</button></a>
                        <a :href="this.url+'intsys/complaint/complaint/add/'+this.ohsUserData.DeptCode+'/'+this.ohsFormno" target="_blank"><button type="button" id="btn-createComplaint" name="btn-createComplaint" class="btn btn-success btn-ohs ml-3"><i class="dw dw-upload mr-2"></i>สร้างเอกสาร Complaint</button></a>
                    </div>
                </div>

                <hr class="comp" style="display:none;">
                <div class="row form-group comp" style="display:none;">
                    <div class="col-lg-12 text-center">
                        <span><b>เอกสาร Complaint เลขที่ : </b></span><span id="complaint_formno"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name:"Ohs",
    data() {
        return {
            url:this.getUrl(),
        }
    },
    props:[
        'ohsUserData',
        'ohsFormno',
        'ohsStatus'
    ],
    created() {
        this.formValidate();
    },
    mounted() {
        this.getDataOhs();
    },
    methods: {
        getDataOhs(){
            // Check Data Mgr
            const proxy = this;
            axios.post(this.url+'intsys/rao/rao_backend/api/api_checkOhsData' , {
                action:"checkOhsData",
                formno:this.$route.params.id
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Not Found Data Ohs"){
                    $('#ip-acci-ohsappro-user').val(this.ohsUserData.Fname+' '+this.ohsUserData.Lname);
                    $('#ip-acci-ohsappro-dept').val(this.ohsUserData.Dept);
                    
                    let condatetimenow = moment(new Date().toString()).format('DD/MM/Y HH:mm:ss');

                    $('#ip-acci-ohsappro-datetime').val(condatetimenow);
                    $('#ip-acci-ohsappro-formno').val(this.$route.params.id);
                    $('#btn-createComplaint').prop('disabled' , true);
                }else if(res.data.status == "Found Data Ohs"){
                    let resultOhs = res.data.result;
                    if(resultOhs.m_ohs_approve == "อนุมัติ"){
                        $('#ip-acci-ohsappro-yes').prop('checked' , true);
                    }else if(resultOhs.m_ohs_approve == "ไม่อนุมัติ"){
                        $('#ip-acci-ohsappro-no').prop('checked' , true);
                    }else if(resultOhs.m_ohs_approve == "แจ้งแก้ไข"){
                        $('#ip-acci-ohsappro-reject').prop('checked' , true);
                    }
                    $('input:radio[name="ip-acci-ohsappro"]').click(function(e){
                        e.preventDefault();
                    });
                    $('#ip-acci-ohsappro-user').val(resultOhs.m_ohs_user);
                    $('#ip-acci-ohsappro-dept').val(resultOhs.m_ohs_dept);
                    let condatetimenow2 = moment(resultOhs.m_ohs_datetime).format('DD/MM/Y HH:mm:ss');
                    $('#ip-acci-ohsappro-datetime').val(condatetimenow2);
                    $('#ip-acci-ohsappro-memo').val(resultOhs.m_ohs_memo).prop('readonly' , true);
                    $('#ip-acci-ohsappro-formno').val(resultOhs.m_formno);
                    $('#btn-ohsSave').css('display' , 'none');
                    proxy.ohsStatus = resultOhs.m_status;
                    if(this.ohsUserData.ecode != "M0004"){
                        $('#btn-createComplaint').css('display' , 'none');
                    }else{
                        if(resultOhs.m_status == "OHS Not Approve" || resultOhs.m_status == "OHS Reject"){
                            $('#btn-createComplaint').css('display' , 'none');
                        }else{
                            $('#btn-createComplaint').css('display' , '');
                            $('#btn-createComplaint').prop('disabled' , false);
                        }
                    }
                    
                }else if(res.data.status == "Complaint Created"){
                    let resultOhs = res.data.result;
                    if(resultOhs.m_ohs_approve == "อนุมัติ"){
                        $('#ip-acci-ohsappro-yes').prop('checked' , true);
                    }else if(resultOhs.m_ohs_approve == "ไม่อนุมัติ"){
                        $('#ip-acci-ohsappro-no').prop('checked' , true);
                    }else if(resultOhs.m_ohs_approve == "แจ้งแก้ไข"){
                        $('#ip-acci-ohsappro-reject').prop('checked' , true);
                    }
                    $('input:radio[name="ip-acci-ohsappro"]').click(function(e){
                        e.preventDefault();
                    });
                    $('#ip-acci-ohsappro-user').val(resultOhs.m_ohs_user);
                    $('#ip-acci-ohsappro-dept').val(resultOhs.m_ohs_dept);
                    let condatetimenow2 = moment(resultOhs.m_ohs_datetime).format('DD/MM/Y HH:mm:ss');
                    $('#ip-acci-ohsappro-datetime').val(condatetimenow2);
                    $('#ip-acci-ohsappro-memo').val(resultOhs.m_ohs_memo).prop('readonly' , true);
                    $('#ip-acci-ohsappro-formno').val(resultOhs.m_formno);
                    $('#btn-ohsSave').css('display' , 'none');
                    $('#btn-createComplaint').css('display' , 'none');
                    $('.comp').css('display' , '');
                    let complaintData = `<a target="_blank" href="`+proxy.url+`intsys/complaint/complaint/view/`+resultOhs.m_complaint_formno+`">`+resultOhs.m_complaint_formno+`</a>`
                    $('#complaint_formno').html(complaintData);
                }
            });

        },
        saveOhs(){
            const proxy = this;
            $('#btn-ohsSave').prop('disabled' , true);
            // Check Data
            if($('input:radio[name="ip-acci-ohsappro"]:checked').length == 0){
                Swal.fire({
                    title: 'กรุณาเลือกการอนุมัติ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
                $('#btn-ohsSave').prop('disabled' , false);
            }else{
                const form = $('#frm-saveOhs')[0];
                const data = new FormData(form);
                
                axios.post(this.url+'intsys/rao/rao_backend/api/api_saveOhs', data).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Save OHS Approve Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลเรียบร้อย',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.getDataOhs();
                            proxy.getViewData();
                        });
                    }
                });
            }

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
    },
}
</script>

<style>

</style>