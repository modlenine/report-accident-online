<template>
  <div id="filterdata">
    <div class="row mt-2">
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-acciType" id="filterBy-acciType" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-userInform" id="filterBy-userInform" class="form-control filterBy-userInform"></select>
        </div>
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-userType" id="filterBy-userType" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-status" id="filterBy-status" class="form-control">
                <option value="">กรองด้วยสถานะ</option>
                <option value="Waiting Send Data">Waiting Send Data</option>
                <option value="Open">Open</option>
                <option value="Edit">Edit</option>
                <option value="Manager Approve">Manager Approved</option>
                <option value="OHS Approved">OHS Approved</option>
                <option value="Complete">Complete</option>
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="startDate" id="startDate" class="form-control">
        </div>
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="endDate" id="endDate" class="form-control">
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateSearch" name="btn-dateSearch" class="btn btn-success btn-block"><i class="dw dw-loupe"></i>&nbsp;ค้นหา</button>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateClear" name="btn-dateClear" class="btn btn-warning btn-block"><i class="dw dw-refresh1"></i>&nbsp;ล้าง</button>
        </div>
    </div>
    <hr>
  </div>
</template>

<script>

import $ from 'jquery';



export default {
    name:'FilterData',
    data() {
        return {
            url:this.getUrl()
        }
    },
    created() {
        
    },
    beforeMount() {

    },
    mounted() {

        $('#startDate').Zebra_DatePicker({
            pair: $('#endDate')
        });
        $('#endDate').Zebra_DatePicker({
            direction: true
        });

    },
    methods: {

    },
}
</script>

<style>

</style>