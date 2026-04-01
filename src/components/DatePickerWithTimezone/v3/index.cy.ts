import datePickerWithTimezone from "./index.vue"

describe("DatePickerWithTimezone", () => {
  it("mounts", () => {
    cy.mount(datePickerWithTimezone)
  })
  it("empty to date", () => {
    cy.mount(datePickerWithTimezone)
    cy.get(".el-date-picker-with-timezone").type("2021-10-10")
    cy.get(".el-date-picker-with-timezone .el-input__inner").then((el) => {
      expect(el.val()).to.equal("2021-10-10")
    })
  })
  it("init with date", () => {
    cy.mount(datePickerWithTimezone, {
      props: {
        modelValue: new Date("2021-10-10")
      }
    })
    cy.get(".el-date-picker-with-timezone .el-input__inner").then((el) => {
      expect(el.val()).to.equal("2021-10-10")
    })
  })

  it("init with date and india timezone", () => {
    cy.mount(datePickerWithTimezone, {
      props: {
        modelValue: new Date("2021-10-10T00:00:00+08:00"),
        timezone: "+05:30"
      }
    })
    cy.get(".el-date-picker-with-timezone input").then((el) => {
      expect(el.val()).to.equal("2021-10-09")
    })
    cy.get(".el-date-picker-with-timezone .timezone-field input").then((el) => {
      expect(el.val()).to.equal("+05:30")
    })
  })

  it("init with datetime with timezone", () => {
    cy.mount(datePickerWithTimezone, {
      props: {
        type: "datetime",
        modelValue: new Date("2021-10-10T12:00:00")
      }
    })
    cy.get(".el-date-picker-with-timezone .el-input__inner").then((el) => {
      expect(el.val()).to.equal("2021-10-10 12:00:00")
    })
  })

  it("init with datetime with india timezone", () => {
    cy.mount(datePickerWithTimezone, {
      props: {
        type: "datetime",
        modelValue: new Date("2021-10-10T12:00:00+08:00"),
        timezone: "+05:30"
      }
    })
    cy.get(".el-date-picker-with-timezone .el-input__inner").then((el) => {
      expect(el.val()).to.equal("2021-10-10 09:30:00")
    })
  })

  it("init with datetime array with timezone", () => {
    cy.mount(datePickerWithTimezone, {
      props: {
        type: "datetimerange",
        modelValue: [new Date("2021-10-10T12:00:00"), new Date("2021-10-11T12:00:00")],
        timezone: "+08:00"
      }
    })
    cy.get(".el-date-picker-with-timezone .el-date-editor input").then((el) => {
      expect(el.first().val()).to.equal("2021-10-10 12:00:00")
      expect(el.last().val()).to.equal("2021-10-11 12:00:00")
    })
  })

  it("init with datetime array with +05:30 timezone", () => {
    cy.mount(datePickerWithTimezone, {
      props: {
        type: "datetimerange",
        modelValue: [new Date("2021-10-10T12:00:00+08:00"), new Date("2021-10-11T12:00:00+08:00")],
        timezone: "+05:30"
      }
    })
    cy.get(".el-date-picker-with-timezone .el-date-editor input").then((el) => {
      expect(el.first().val()).to.equal("2021-10-10 09:30:00")
      expect(el.last().val()).to.equal("2021-10-11 09:30:00")
    })
  })

  it("init with datetime array with -08:00 timezone", () => {
    cy.mount(datePickerWithTimezone, {
      props: {
        type: "datetimerange",
        modelValue: [new Date("2021-10-10T12:00:00+08:00"), new Date("2021-10-11T12:00:00+08:00")],
        timezone: "-08:00"
      }
    })
    cy.get(".el-date-picker-with-timezone .el-date-editor input").then((el) => {
      expect(el.first().val()).to.equal("2021-10-09 20:00:00")
      expect(el.last().val()).to.equal("2021-10-10 20:00:00")
    })
  })
})
