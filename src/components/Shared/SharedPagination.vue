<template>
  <v-layout
    row
    wrap
    style="min-width: 500px; margin-top: 12px"
    class="pagination-t"
  >
    <v-flex xs12 sm12 md12 class="pg-wr align-items-center">
      <!-- <p class="mb-0">{{ totalMessage }}</p> -->
      <v-pagination
        class="custom"
        v-model="pagination.page"
        :length="totalPage"
        total-visible="7"
        @input="pageChange"
      ></v-pagination>
      <v-flex class="grow-unset paginate">
        <p class="dot-page">/page</p>
        <p class="select-text">Hiển thị</p>
        <v-select
          class="select-size pt-0"
          v-model="pagination.rowsPerPage"
          :items="pageSizes"
          @change="pageSizeChange"
        >
        </v-select>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    //  totalPage: { type: Number, default: 0 },
    //  rowsPerPage: { type: Number, default: 15 },
    //  total: { type: Number, default: 0 },
    //  page: { type: Number, default: 1 },
    //  lastRowPage: { type: Number, default: 50 },
    //  firstRowPage: { type: Number, default: 1 },
    paginationSync: { type: Object },
  },
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 15,
      },
      pageSizes: [1, 15, 50, 100, 200, 300, 1000],
    };
  },
  created() {
    if (this.paginationSync) {
      this.pagination.page = this.paginationSync.page;
      this.pagination.rowsPerPage = this.paginationSync.size;
    }
  },
  computed: {
    ...mapState({
      previousPagination: (state) => state.previousPagination,
    }),
    totalPage() {
      return this.paginationSync ? this.paginationSync.total_pages : 1;
    },
    total() {
      return this.paginationSync ? this.paginationSync.total : 1;
    },
    totalMessage() {
      if (
        !this.paginationSync ||
        this.paginationSync.total === 0 ||
        !this.paginationSync.total
      ) {
        return `0 item`;
      }
      const fromIdx =
        (this.paginationSync.page - 1) * this.paginationSync.size + 1;
      const toIdx = Math.min(
        this.paginationSync.page * this.paginationSync.size,
        this.paginationSync.total
      );

      return `${fromIdx}-${toIdx} of ${this.paginationSync.total} items`;
    },
  },
  watch: {
    rowsPerPage() {
      this.pagination.rowsPerPage = this.rowsPerPage;
    },
    page() {
      this.pagination.page = this.page;
    },
  },
  methods: {
    pageSizeChange() {
      this.pagination.page = 1;
      this.$emit("handlePageSizeChange", {
        page: this.pagination.page,
        size: this.pagination.rowsPerPage,
      });
    },
    pageChange() {
      this.$emit("handlePageChange", {
        page: this.pagination.page,
        size: this.pagination.rowsPerPage,
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/_variables.scss";
.pg-wr {
  display: flex;
  justify-content: flex-end !important;
}
.dot-page {
  position: absolute;
  right: 25px;
  display: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  bottom: -6px;
}
.select-text {
  position: absolute;
  font-size: 10px;
  background-color: #fafafa;
  z-index: 7;
  right: 62px;
  top: 132px;
  width: 37px;
  padding-left: 2px;
  color: #808890;
}
.select-size .v-input__slot::before {
  display: none;
}
.v-pagination .v-pagination__navigation .v-icon {
  color: $backgroundMain !important;
  background-color: #f2f4f6 !important;
}
.select-size {
  .v-text-field__details {
    display: none;
  }

  .v-select__slot {
    border: 1px solid #e5e7e8;
    border-radius: 4px;
    width: 68px;
    .v-select__selections {
      margin-left: 6px !important;
      width: 54px !important;
    }
  }
}
.custom .v-pagination__navigation {
  box-shadow: none !important;
  background-color: rgb(250, 250, 250) !important;
  outline: none !important;
  min-width: 32px !important;
  background-image: url("../../assets/images/chevron-left@3x.png");
  height: 32px !important;
}
.custom .v-pagination__item {
  font-size: 15px !important;
  box-shadow: none !important;
  border-radius: 50% !important;
  color: #223140 !important;
  outline: none !important;
  margin: 0 !important;
  min-width: 32px !important;
  height: 32px !important;
  background-color: rgb(250, 250, 250) !important;
  &--active {
    font-size: 15px !important;
    border-radius: 50% !important;
    background-color: $backgroundMain !important;
    color: $primaryWhite !important;
  }
}
.v-list__tile {
  min-width: 50px !important;
}
.custom .v-pagination__item:focus {
  font-size: 15px !important;
  box-shadow: none !important;
  border: none !important;
  outline: none !important;
}
</style>
