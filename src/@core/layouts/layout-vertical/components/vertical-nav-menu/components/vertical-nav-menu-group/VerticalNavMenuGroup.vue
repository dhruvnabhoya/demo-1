<template>
    <li
        v-if="canViewVerticalNavMenuGroup(item)"
        class="nav-item has-sub"
        :class="{
            'open': isOpen,
            'disabled': item.disabled,
            'sidebar-group-active': isActive,
            'hidelist': item.hidden
        }"
    >
        <b-link
            class="d-flex align-items-center"
            @click="() => updateGroupOpen(!isOpen)"
        >
            <feather-icon 
                :icon="item.icon || 'CircleIcon'" 
                :style="(item.disabled) ? 'color:gray;' : '' "
            />
            <span 
                class="menu-title text-truncate" 
                :style="(item.disabled) ? 'color:gray;' : '' "
            >
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
        <b-collapse
            v-model="isOpen"
            class="menu-content custom-submenu-class"
            tag="ul"
        >
            <component
                :is="resolveNavItemComponent(child)"
                v-for="child in item.children"
                :key="child.header || child.title"
                ref="groupChild"
                :item="child"
            />
        </b-collapse>
    </li>
</template>

<script>
    import { BLink, BBadge, BCollapse } from 'bootstrap-vue'
    import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
    import { useUtils as useI18nUtils } from '@core/libs/i18n'
    import { useUtils as useAclUtils } from '@core/libs/acl'
    import VerticalNavMenuHeader from '../vertical-nav-menu-header'
    import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'

    // Composition Function
    import useVerticalNavMenuGroup from './useVerticalNavMenuGroup'
    import mixinVerticalNavMenuGroup from './mixinVerticalNavMenuGroup'

    export default {
        name: 'VerticalNavMenuGroup',
        components: {
            VerticalNavMenuHeader,
            VerticalNavMenuLink,
            BLink,
            BBadge,
            BCollapse,
        },
        mixins: [mixinVerticalNavMenuGroup],
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        setup(props) {
            const {
                isOpen,
                isActive,
                updateGroupOpen,
                updateIsActive,
            } = useVerticalNavMenuGroup(props.item)

            const { t } = useI18nUtils()
            const { canViewVerticalNavMenuGroup } = useAclUtils()

            return {
                resolveNavItemComponent,
                isOpen,
                isActive,
                updateGroupOpen,
                updateIsActive,

                // ACL
                canViewVerticalNavMenuGroup,

                // i18n
                t,
            }
        },
        created(){
            let labelFind =  this.item.children.find(data => data.title.toLowerCase() === 'labels');
            if(labelFind)  labelFind.disabled = !localStorage.getItem("labels");

            let consignorFind = this.item.children.find(data => data.title.toLowerCase() === 'consignor');
            if(consignorFind) consignorFind.disabled = !localStorage.getItem("consignor");

            let consignorpalletsFind = this.item.children.find(data => data.title.toLowerCase().replaceAll(' ','') === 'consignorpallets');
            if(consignorpalletsFind) consignorpalletsFind.disabled = !localStorage.getItem("consignorpallets");
        }
    }
</script>

<style scoped>
    .hidelist{
        display: none;
    }
    .custom-submenu-class{
        margin-left: 15px !important;
    }
    .custom-text{
        font-size: 12px;
    }
  
</style>
