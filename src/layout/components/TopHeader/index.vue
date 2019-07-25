<template>
  <div class="header">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <span>{{ title }}</span>
    <div class="right-menu">

      <template>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/avatar/user.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <a target="_blank" href="http://www.grandage.cn/">
            <el-dropdown-item>公司官网</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      title: state => state.settings.title
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss">
  .header {
    .el-dropdown-menu {
      position: absolute;
      top: 40px;
    }
  }
</style>

<style lang="scss" scoped>

  @import "~@/styles/variables.scss";

  .header {
    height: $topHeaderHeight;
    line-height: $topHeaderHeight;
    overflow: hidden;
    position: fixed;
    width: 100%;
    background: #fff;
    z-index:1000;
    box-shadow: 0 2px 4px rgba(0, 2, 6, 0.11);

    .hamburger-container {
      line-height: $topHeaderHeight;
      height: 100%;
      float: left;
      margin-right: 16px;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: $topHeaderHeight;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -14px;
            top: 10px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
