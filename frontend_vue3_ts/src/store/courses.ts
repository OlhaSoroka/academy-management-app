import { defineStore } from "pinia";
import { ICourse } from "../models/courses.models";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../main";
import { getAllCourses, updateCourseById, deleteCourse } from "../api/course";
import { ToastType, useToastStore } from "../store/toast.store";

interface ICoursesStoreState {
  courses: ICourse[];
  isLoading: boolean;
}

export const useCoursesStore = defineStore("courses", {
  state: (): ICoursesStoreState => {
    return {
      courses: [],
      isLoading: false,
    };
  },
  getters: {
    courses: (state) => state.courses,
    lastCourseId(state) {
      return state.courses[state.courses.length - 1].id;
    },
    firstCourseId(state) {
      return state.courses[0].id;
    },
    loadingStatus(state) {
      return state.isLoading;
    },
    getCourseById(state) {
      return (id: string) => {
        return state.courses.find((course) => course.id === +id);
      };
    },
    courseIndex(state) {
      return (courseItem: ICourse) => state.courses.indexOf(courseItem);
    },
    nextCourseId(state) {
      return (id: string) => {
        const currentCurse = this.getCourseById(id);
        let currentIndex = this.courseIndex(currentCurse!);
        if (currentIndex < state.courses.length - 1) {
          return state.courses[currentIndex + 1].id;
        } else return state.courses[0].id;
      };
    },
    previousCourseId(state) {
      return (id: string) => {
        const currentCurse = this.getCourseById(id);
        let currentIndex = this.courseIndex(currentCurse!);
        if (currentIndex > 0) {
          return state.courses[currentIndex - 1].id;
        } else return state.courses[state.courses.length - 1].id;
      };
    },
  },
  actions: {
    setCourses(courses: ICourse[]) {
      this.courses = courses;
    },
    changeLoadingStatus() {
      this.isLoading = !this.isLoading;
    },
    sortCourses() {
      this.courses.sort((a, b) => (a.date > b.date ? -1 : 1));
    },
    async getCourses() {
      this.changeLoadingStatus;
      try {
        const courses = await getAllCourses();
        if (courses) {
          this.setCourses(courses);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      } finally {
        this.changeLoadingStatus;
      }
    },
    async createNewCourse(data: ICourse) {
      try {
        await setDoc(doc(db, "courses", `${data.id}`), data).then(() => {
          this.getCourses;
          const toastStore = useToastStore();
          toastStore.showToastMessage({
            message: "Course succesfully created!",
            type: ToastType.SUCCESS,
          });
        });
      } catch (error: any) {
        this.getCourses;
        const errorMessage = error.response?.data?.error || error.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      }
    },
    async addNewComment(payload: any) {
      try {
        const courseRef = doc(db, "courses", `${payload.id}`);
        await updateDoc(courseRef, payload.currentItemUpdate).then(() => {
          this.getCourses;
          const toastStore = useToastStore();
          toastStore.showToastMessage({
            message: "Comment sent!",
            type: ToastType.SUCCESS,
          });
        });
      } catch (error: any) {
        this.getCourses;
        const errorMessage = error.response?.data?.error || error.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      }
    },
    async updateCourse(payload: any) {
      try {
        await updateCourseById(payload.id, payload.course).then(() => {
          this.getCourses;
          const toastStore = useToastStore();
          toastStore.showToastMessage({
            message: "Course succesfully updated!",
            type: ToastType.SUCCESS,
          });
        });
      } catch (error: any) {
        this.getCourses;
        const errorMessage = error.response?.data?.error || error.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      }
    },
    deleteCourseFromState(id: string) {
      this.changeLoadingStatus;
      deleteCourse(id)
        .then(() => {
          const toastStore = useToastStore();
          toastStore.showToastMessage({
            message: "Course succesfully deleted!",
            type: ToastType.SUCCESS,
          });
        })
        .catch((error: any) => {
          const errorMessage =
            error.response?.data?.error || error.response.data.message;
          const toastStore = useToastStore();
          toastStore.showToastMessage({
            message: errorMessage,
            type: ToastType.FAILURE,
          });
        })
        .finally(() => {
          this.changeLoadingStatus;
          this.getCourses;
        });
    },
    patchCourses(payload: any) {
      try {
        this.getCourses;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Succesfully deleted!",
          type: ToastType.SUCCESS,
        });
      } catch (error: any) {
        this.getCourses;
        const errorMessage = error.response?.data?.error || error.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      }
    },
  },
});
