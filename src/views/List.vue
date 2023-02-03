<template>
  <div id="list">

    <div class="main-container">
      <div class="pd-ltr-20">
      
          <div class="row">
            <div class="col-xl-12 mb-30">
              <div class="card-box height-100-p pd-20">
                <div class="mt-5"></div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <router-link to="/addData" type="button" id="btn-addMachineData" class="btn btn-primary btnIndex">
                      <i class="fi-plus mr-2"></i>แจ้งอุบัติเหตุ</router-link>
                  </div>
                </div>
                <hr>
                  <FilterData/>
                <div class="mt-4"></div>
                <h3 style="text-align:center;" class="mb-3">รายการแจ้งอุบัติเหตุ</h3>
               
                  <table id="dataMainList" class="table table-striped table-bordered" cellspacing="0">
                    <thead>
                      <tr>
                        <th class="td1">เลขที่รายการ</th>
                        <th class="td2">วันที่เกิดเหตุ</th>
                        <th class="td3">สถานที่เกิดเหตุ</th>
                        <th class="td4">ประเภท</th>
                        <th class="td5">ชื่อผู้ประสบเหตุ</th>
                        <th class="td6">สถานะบุคคล</th>
                        <th class="td7">ผู้แจ้งเหตุ</th>
                        <th class="td9">สถานะ</th>
                      </tr>
                    </thead>
                  </table>
                

              </div>
            </div>
          </div>

      </div>
	  </div>

  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import FilterData from '@/components/FilterData.vue';




export default {
  name:'List',
  components:{
    FilterData
  },
  data(){
    return{
      url:this.getUrl(),
    }
  },

  created() {
    
  },
  beforeMount() {
    
  },
  mounted() {
    this.loadAcciList();

    const proxy = this;

    $(document).on('click' , '.acci_formno' , function(){
      const m_formno = $(this).attr("data_formno");

      // proxy.$router.push('/viewdata/'+onsite_formno);

       const path = `/viewdata/${m_formno}`;
        if (proxy.$route.path !== path) proxy.$router.push(path)
    });



    $(document).on('click' , '#btn-dateSearch' , function(){

      let startDate_filter = $('#startDate').val();
			let endDate_filter = $('#endDate').val();
			let acciType_filter = $('#filterBy-acciType').val();
			let userInform_filter = $('#filterBy-userInform').val();
			let userType_filter = $('#filterBy-userType').val();
			let status_filter = $('#filterBy-status').val();

			let filterObject = {
				"startDate_filter":startDate_filter,
				"endDate_filter":endDate_filter,
				"acciType_filter":acciType_filter,
				"userInform_filter":userInform_filter,
				"userType_filter":userType_filter,
				"status_filter":status_filter
			};

			//create session storage
			localStorage.setItem('filterObject' , JSON.stringify(filterObject));

			let table = $('#dataMainList').DataTable();
			table.state.clear();

			proxy.loadAcciList();
		});

    $('#btn-dateClear').click(function(){
			localStorage.removeItem("filterObject");
			// let table = $('#dataMainList').DataTable();
			// table.state.clear();

      	$('#startDate').val('');
				$('#endDate').val('');
				$('#filterBy-acciType').val('');
				$('#filterBy-userInform').val('');
				$('#filterBy-userType').val('');
				$('#filterBy-status').val('');

			proxy.loadAcciList();
		});

      proxy.getFilterAcciType();
      proxy.getFilterUserInform();
      proxy.getFilterUserType();

  },
  methods: {
    loadAcciList()
    {
      let startDate_filter = $('#startDate').val();
			let endDate_filter = $('#endDate').val();
			let acciType_filter = $('#filterBy-acciType').val();
			let userInform_filter = $('#filterBy-userInform').val();
			let userType_filter = $('#filterBy-userType').val();
			let status_filter = $('#filterBy-status').val();


			if(startDate_filter == "" || startDate_filter == null){
				startDate_filter = "0";
			}

			if(endDate_filter == "" || endDate_filter == null){
				endDate_filter = "0";
			}

			if(acciType_filter == "" || acciType_filter == null){
				acciType_filter = "0";
			}

			if(userInform_filter == "" || userInform_filter == null){
				userInform_filter = "0";
			}

			if(userType_filter == "" || userType_filter == null){
				userType_filter = "0";
			}else if(userType_filter == "บุคคลภายนอกบริษัท"){
        userType_filter = "1";
      }else if(userType_filter == "บุคคลภายในบริษัท"){
        userType_filter = "2";
      }

			if(status_filter == "" || status_filter == null){
				status_filter = "0";
			}else{
				status_filter = status_filter.replace(/\s+/g,"-");
			}

			console.log(startDate_filter+"/"+endDate_filter+"/"+acciType_filter+"/"+userInform_filter+"/"+userType_filter+"/"+status_filter);

        let thid = 1;
        $('#dataMainList thead th').each(function() {
          var title = $(this).text();
          $(this).html(title + ' <input type="text" id="dataMainList'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
          thid++;
        });

        	$('#dataMainList').DataTable().destroy();
            var table = $('#dataMainList').DataTable({
                        "scrollX": true,
                        "processing": true,
                        "serverSide": true,
                        "stateSave": true,
                        stateLoadParams: function(settings, data) {
                            for (let i = 0; i < data.columns["length"]; i++) {
                                let col_search_val = data.columns[i].search.search;
                                if (col_search_val !== "") {
                                    $("input", $("#dataMainList thead th")[i]).val(col_search_val);
                                }
                            }
                        },
                        "ajax": {
"url":this.url+'intsys/rao/rao_backend/api/api_loadAcciList/'+startDate_filter+'/'+endDate_filter+'/'+acciType_filter+'/'+userInform_filter+'/'+userType_filter+'/'+status_filter,
                        },
                        dom: 'Bfrtip',
                          "buttons": [{
                            extend: 'copyHtml5',
                            title: 'รายงานการ Service'
                          },
                          {
                            extend: 'excelHtml5',
                            autoFilter: true,
                            title: 'รายงานการ Service'
                          }
                          ],
                        order: [
                            [0, 'desc']
                        ],
                        columnDefs: [{
                                targets: "_all",
                                orderable: false
                            },
                        ],
                });

            table.columns().every(function() {
                var table = this;
                $('input', this.header()).on('keyup change', function() {
                    if (table.search() !== this.value) {
                        table.search(this.value).draw();
                    }
                });
            });

            

            // $('#normal_list6 , #normal_list2').prop('readonly' , true).css({
            //     'background-color':'#F5F5F5',
            //     'cursor':'no-drop'
            // });
    },
    getFilterAcciType()
    {
        axios.post(this.url+'intsys/rao/rao_backend/api/api_getFilterAcciType',{
            action:'getFilterAcciType'
        }).then(res=>{
            console.log(res.data);

            let result = res.data.result;
            let html ='<option value="">กรองด้วยประเภท</option>';
            for(let i = 0; i < result.length; i++){
                html +=`
                <option value="`+result[i].type_autoid+`">`+result[i].type_name+`</option>
                `;
            }

            $('#filterBy-acciType').html(html);
        });
    },
    getFilterUserInform(){
        const proxy = this;
        axios.get(this.url+'intsys/rao/rao_backend/api/api_getFilterUserInform').then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
                let result = res.data.result;
                let html = `
                    <option value="">กรองด้วยผู้แจ้งเหตุ</option>
                `;
                for(let i = 0; i < result.length; i++){
                    html +=`
                    <option value="`+result[i].m_ecode_inform+`">`+result[i].m_user_inform+`</option>
                    `;
                    $('#filterBy-userInform').html(html);
                }

                proxy.loadFilterOnSessionStorage();

            }
        });
    },
    getFilterUserType(){
        axios.get(this.url+'intsys/rao/rao_backend/api/api_getFilterUserType').then(res=>{
            console.log(res.data);
            if(res.data.status == "Select Data Success"){
                let result = res.data.result;
                let html = `
                <option value="">กรองโดยสถานะบุคคล</option>
                `;
                for(let i = 0; i < result.length; i++){
                    html +=`
                    <option value="`+result[i].m_type1+`">`+result[i].m_type1+`</option>
                    `;
                }

                $('#filterBy-userType').html(html);
            }

        });
    },
    loadFilterOnSessionStorage()
{
        const proxy = this;
  let getfilterObject = localStorage.getItem("filterObject");
  console.log(JSON.parse(getfilterObject));

  if(getfilterObject != null){
    let startDate_filter = JSON.parse(getfilterObject).startDate_filter;
    let endDate_filter = JSON.parse(getfilterObject).endDate_filter;
    let acciType_filter = JSON.parse(getfilterObject).acciType_filter;
    let userInform_filter = JSON.parse(getfilterObject).userInform_filter;
    let userType_filter = JSON.parse(getfilterObject).userType_filter;
    let status_filter = JSON.parse(getfilterObject).status_filter;

    $('#startDate').val(startDate_filter);
    $('#endDate').val(endDate_filter);
    $('#filterBy-acciType').val(acciType_filter);
    // $('#filterBy-userInform option[value="'+userInform_filter+'"]').prop('selected' , true);
            $('#filterBy-userInform').val(userInform_filter);
    $('#filterBy-userType').val(userType_filter);
    $('#filterBy-status').val(status_filter);
            proxy.loadAcciList();
  }
    },

    

  },
  
}
</script>

<style scoped>

  #dataMainList{
    width:1500px !important;
  }

  .td1{
    width:100px !important;
  }

  .td2{
    width:150px !important;
  }

  .td8{
    width:80px !important;
  }


@media (min-width:1024px) and (max-width:1439px){
	#dataMainList{
    width:1500px !important;
  }

  .td1{
    width:100px !important;
  }

  .td2{
    width:150px !important;
  }

}

@media (min-width:768px) and (max-width:1023px){
	#dataMainList{
    width:1500px !important;
  }

  .td1{
    width:100px !important;
  }

  .td2{
    width:250px !important;
  }

}

@media (min-width:320px) and (max-width:767px) {
	#dataMainList{
    width:1500px !important;
  }

}
</style>