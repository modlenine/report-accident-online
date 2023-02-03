<template>
  <div id="mgr">
    <form id="frm-saveMgr" @submit.prevent="saveMgr" autocomplete="off" class="needs-validation" novalidate>
    <div class="row">
        <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
                <h3 class="text-center">สำหรับผู้จัดการแผนก</h3>
                <div class="mt-3"></div>
                <div class="row form-group">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 form-group">
                                    <div class="row">
                                        <div class="col-lg-12 form-inline">
                                            <div class="custom-control custom-radio mb-5 ml-3">
                                                <input type="radio" id="ip-acci-mgrappro-yes" name="ip-acci-mgrappro" value="อนุมัติ" class="custom-control-input" required> 
                                                <label for="ip-acci-mgrappro-yes" class="custom-control-label">อนุมัติ</label>
                                            </div> 
                                            <div class="custom-control custom-radio mb-5 ml-3">
                                                <input type="radio" id="ip-acci-mgrappro-no" name="ip-acci-mgrappro" value="ไม่อนุมัติ" class="custom-control-input" required> 
                                                <label for="ip-acci-mgrappro-no" class="custom-control-label">ไม่อนุมัติ</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for=""><b>หมายเหตุ</b></label>
                                <textarea name="ip-acci-mgrappro-memo" id="ip-acci-mgrappro-memo" cols="30" rows="10" class="form-control" style="height:100px"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <label for=""><b>ผู้อนุมัติ</b></label>
                                <input type="text" name="ip-acci-mgrappro-user" id="ip-acci-mgrappro-user" class="form-control" readonly>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for=""><b>ฝ่าย</b></label>
                                <input type="text" name="ip-acci-mgrappro-dept" id="ip-acci-mgrappro-dept" class="form-control" readonly>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for=""><b>ลงวันที่</b></label>
                                <input type="text" name="ip-acci-mgrappro-datetime" id="ip-acci-mgrappro-datetime" class="form-control" readonly>
                            </div>
                        </div>
                    </div>
                </div>

                <input hidden type="text" name="ip-acci-mgrappro-formno" id="ip-acci-mgrappro-formno">

                <div class="row form-group">
                    <div class="col-lg-12 text-center">
                        <button type="submit" id="btn-mgrSave" name="btn-mgrSave" class="btn btn-success btn-mgr"><i class="dw dw-diskette1 mr-2"></i>บันทึก</button>
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
    name:"Mgr",
    data() {
        return {
            url:this.getUrl(),
        }
    },
    props:[
        'mgrUserData'
    ],
    created() {
        this.formValidate();
    },
    mounted() {
        this.getDataMgr();
    },
    methods: {
        getDataMgr(){
            // Check Data Mgr
            axios.post(this.url+'intsys/rao/rao_backend/api/api_checkMgrData' , {
                action:"checkMgrData",
                formno:this.$route.params.id
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Not Found Data Mgr"){
                    $('#ip-acci-mgrappro-user').val(this.mgrUserData.Fname+' '+this.mgrUserData.Lname);
                    $('#ip-acci-mgrappro-dept').val(this.mgrUserData.Dept);
                    let condatetimenow = moment(new Date().toString()).format('DD/MM/Y HH:mm:ss');
                    $('#ip-acci-mgrappro-datetime').val(condatetimenow);
                    $('#ip-acci-mgrappro-formno').val(this.$route.params.id);
                }else{
                    let resultMgr = res.data.result;
                    if(resultMgr.m_mgr_approve == "อนุมัติ"){
                        $('#ip-acci-mgrappro-yes').prop('checked' , true);
                    }else if(resultMgr.m_mgr_approve == "ไม่อนุมัติ"){
                        $('#ip-acci-mgrappro-no').prop('checked' , true);
                    }
                    $('input:radio[name="ip-acci-mgrappro"]').click(function(e){
                        e.preventDefault();
                    });
                    $('#ip-acci-mgrappro-user').val(resultMgr.m_mgr_user);
                    $('#ip-acci-mgrappro-dept').val(resultMgr.m_mgr_dept);
                    let condatetimenow2 = moment(resultMgr.m_mgr_datetime).format('DD/MM/Y HH:mm:ss');
                    $('#ip-acci-mgrappro-datetime').val(condatetimenow2);
                    $('#ip-acci-mgrappro-memo').val(resultMgr.m_mgr_memo).prop('readonly' , true);
                    $('#ip-acci-mgrappro-formno').val();
                    $('#btn-mgrSave').css('display' , 'none');
                }
            });

        },
        saveMgr(){
            $('#btn-mgrSave').prop('disabled' , true);
            // Check Data
            if($('input:radio[name="ip-acci-mgrappro"]:checked').length == 0){
                Swal.fire({
                    title: 'กรุณาเลือกการอนุมัติ',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
                $('#btn-mgrSave').prop('disabled' , false);
            }else{
                const form = $('#frm-saveMgr')[0];
                const data = new FormData(form);
                const proxy = this;

                axios.post(this.url+'intsys/rao/rao_backend/api/api_saveMgr', data).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Save Mgr Approve Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลเรียบร้อย',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push(`/list`);
                        });
                    }
                });
            }

        }
    },
}
</script>

<style scoped>
    .btn-mgr{
        width:200px !important;
    }
</style>