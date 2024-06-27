package com.example.document_manage.controller;

import com.example.document_manage.model.DTO.ITypeWithCountDocument;
import com.example.document_manage.model.Document;
import com.example.document_manage.model.Type;
import com.example.document_manage.service.type.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
@RequestMapping("/types")
public class TypeController {
    @Autowired
    private TypeService typeService;


    @RequestMapping("")
    public String index(Model model) {

        Iterable<ITypeWithCountDocument> types = typeService.findAllWithCountDocument();
        model.addAttribute("types", types);
        return "type/index";
    }

    @RequestMapping("/create")
    public String create(Model model) {
        model.addAttribute("type", new Type());
        return "type/create";
    }

    @PostMapping("/create")
    public String create(
            @Validated @ModelAttribute Type type,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            Model model
    ) {
        if (bindingResult.hasFieldErrors()) {
            model.addAttribute("type", type);
            return "type/create";
        }
        typeService.save(type);
        redirectAttributes.addFlashAttribute("success", "Thêm mới thành công");
        return "redirect:/types";
    }

    @RequestMapping("/{id}/edit")
    public String edit( @PathVariable Long id, Model model) {
        Type type = typeService.findById(id);
        model.addAttribute("type", type);
        return "type/edit";
    }

    @PostMapping("/{id}/update")
    public String update(
            @Validated @ModelAttribute Type type,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            Model model
    ) {
        if (bindingResult.hasFieldErrors()) {
            model.addAttribute("type", type);
            return "type/edit";
        }
        typeService.save(type);
        redirectAttributes.addFlashAttribute("success", "Cập nhật thành công");
        return "redirect:/types";
    }

    @RequestMapping("/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        typeService.delete(id);
        redirectAttributes.addFlashAttribute("success", "Xóa thành công");
        return "redirect:/types";
    }

}
