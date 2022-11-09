<template>
    <p class="clearfix mb-0">
        <span class="float-md-left d-block d-md-inline-block mt-25">
        COPYRIGHT  © {{ new Date().getFullYear() }}
        <b-link
            class="ml-25"
            href="https://netsupport.dk/"
            target="_blank"
        >Integreat</b-link>
        <span class="d-none d-sm-inline-block">, All rights Reserved.</span>
        <span class="d-none d-sm-inline-block">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
        <span class="d-none d-sm-inline-block"> v.2022-1056-0911</span>
        </span>
        <!-- <span class="float-md-right d-none d-md-block">Hand-crafted &amp; Made with
        <feather-icon
            icon="HeartIcon"
            size="21"
            class="text-danger stroke-current"
        />
        </span> -->
    </p>
</template>
<script>
    import { BLink } from 'bootstrap-vue'
    //import moment from "moment"
    export default {
        components: {
            BLink,
        },
        created(){
        //console.log(moment().format('yyyy-MMDD-hhmm'));
        }
    }
</script>
