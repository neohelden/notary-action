"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../src/util");
describe("Github tags", function () {
    it("should detect one tag", function () {
        var tagString = "repository.github.com/repo:tag1";
        var result = util_1.tags2array(tagString);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toContain("repository.github.com/repo:tag1");
        expect(result.length).toBe(1);
    });
    it("should detect multiple tags seperated by a new line", function () {
        var tagString = "repository.github.com/repo:tag1\nrepository.github.com/repo:tag2";
        var result = util_1.tags2array(tagString);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toContain("repository.github.com/repo:tag1");
        expect(result).toContain("repository.github.com/repo:tag2");
        expect(result.length).toBe(2);
    });
    it("should detect multiple tags seperated by a space", function () {
        var tagString = "repository.github.com/repo:tag1 repository.github.com/repo:tag2";
        var result = util_1.tags2array(tagString);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toContain("repository.github.com/repo:tag1");
        expect(result).toContain("repository.github.com/repo:tag2");
        expect(result.length).toBe(2);
    });
    it("should detect multiple tags seperated by a comma", function () {
        var tagString = "repository.github.com/repo:tag1,repository.github.com/repo:tag2";
        var result = util_1.tags2array(tagString);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toContain("repository.github.com/repo:tag1");
        expect(result).toContain("repository.github.com/repo:tag2");
        expect(result.length).toBe(2);
    });
});
