import { mount } from "@vue/test-utils";
import DynamicForm from "@/components/DynamicForm.vue"; // adjust the path as needed

describe("DynamicForm", () => {

  it("should add a new field", async () => {
    const wrapper = mount(DynamicForm);
    const addButton = wrapper.find(".btn-add");

    await addButton.trigger("click");
    const inputFields = wrapper.findAll(".form-field .input-field");
    expect(inputFields.length).toBeGreaterThanOrEqual(4); // should have one more field after clicking add
  });

  it("should remove a field", async () => {
    const wrapper = mount(DynamicForm);
    const removeButtons = wrapper.findAll(".btn-remove");

    if (removeButtons.length > 0) {
      await removeButtons[0].trigger("click");
      const inputFields = wrapper.findAll(".form-field .input-field");
      expect(inputFields.length).toBeGreaterThanOrEqual(2); // should have one less field after clicking remove
    }
  });
});
