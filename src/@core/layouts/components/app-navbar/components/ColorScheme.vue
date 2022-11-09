<template>
    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <!-- <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              color
            </p>
            <span class="user-status"></span>
          </div> -->
          <b-img
                src="@/assets/images/icons/color_piker.png"
                class="color_piker"
                alt="color_piker"
            />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <div class="green-btn"></div>
          <span>Green</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <div class="blue-btn"></div>
          <span>Blue</span>
        </b-dropdown-item>
        
      </b-nav-item-dropdown>
    </b-navbar-nav>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BImg
} from "bootstrap-vue";

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BImg,
  },
}
</script>
<style scoped>
    .color_piker{
        width: 100%;
        max-width: 25px;
        filter: invert();
    }
    .green-btn{
        border-radius: 50%;
        background-color: #2d838e;
        padding: 10px;
        margin-right: 10px;
    }
    .blue-btn{
        border-radius: 50%;
        background-color: #5858f5;
        padding: 10px;
        margin-right: 10px;
    }
</style>