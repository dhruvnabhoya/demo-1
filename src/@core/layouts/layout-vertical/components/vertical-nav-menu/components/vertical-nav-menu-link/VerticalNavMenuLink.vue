<template>
    <li
        v-if="canViewVerticalNavMenuLink(item)"
        class="nav-item"
        :class="{
            'active': isActive,
            'disabled': item.disabled,
            'hidelist': item.hidden
        }"
    >
        <b-link
            v-bind="linkProps"
            class="d-flex align-items-center"
        >
            <feather-icon :icon="item.icon || 'CircleIcon'" :style="(item.disabled) ? 'color:gray;' : '' "/>
            <span class="menu-title text-truncate" :style="(item.disabled) ? 'color:gray;' : '' " @click="reloadFunction" v-on:click="flag = true">
                {{ $t(item.title) }}
            </span>
            <b-badge
                v-if="item.tag"
                pill
                :variant="item.tagVariant || 'primary'"
                class="mr-1 ml-auto"
            >
                {{ item.tag }}
            </b-badge>
        </b-link>
    </li>
  
</template>

<script>
    import { useUtils as useAclUtils } from '@core/libs/acl'
    import { BLink, BBadge } from 'bootstrap-vue'
    import { useUtils as useI18nUtils } from '@core/libs/i18n'
    import useVerticalNavMenuLink from './useVerticalNavMenuLink'
    import mixinVerticalNavMenuLink from './mixinVerticalNavMenuLink'
    //import axios from "axios";

    export default {
        components: {
            BLink,
            BBadge,
        },
        mixins: [mixinVerticalNavMenuLink],
        props: {
            item: {
                type: Object,
                required: true,
            }    
        },
        data() {
            return {
                flag: false
            }
        },
        setup(props) {
            const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(props.item)
            const { t } = useI18nUtils()
            const { canViewVerticalNavMenuLink } = useAclUtils()

            return {
                isActive,
                linkProps,
                updateIsActive,
                canViewVerticalNavMenuLink,
                t,
            }
        },
        created(){
            //console.log('navmenulink',this.item);
        },
        methods: {
            reloadFunction(){
                if(this.flag){
                    location.href = window.location.href 
                }
            }
        },
    }
</script>

<style scoped>
    .hidelist{
        display: none;
    }
    .custom-text{
        font-size: 12px;
    }
</style>