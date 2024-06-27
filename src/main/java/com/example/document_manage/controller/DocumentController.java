package com.example.document_manage.controller;

import com.example.document_manage.model.Document;
import com.example.document_manage.model.Type;
import com.example.document_manage.service.document.DocumentService;
import com.example.document_manage.service.type.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/documents")
public class DocumentController {
    @Autowired
    private DocumentService documentService;
    @Autowired
    private TypeService typeService;

    @ModelAttribute("types")
    public Iterable<Type> types() {
        return typeService.findAll();
    }

    @RequestMapping("")
    public String index(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String sort,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") Long typeId,
            Model model
    ) {

        Page<Document> documents = documentService.findAll(page, size, sort, search, typeId);
        model.addAttribute("documents", documents);
        model.addAttribute("page", page);
        model.addAttribute("size", size);
        model.addAttribute("sort", sort);
        model.addAttribute("search", search);
        model.addAttribute("typeId", typeId);
        model.addAttribute("sortOptions", getSortOptions());
        model.addAttribute("sizeOptions", getSizeOptions());
        return "document/index";

    }

    @RequestMapping("/create")
    public String create(Model model) {
        model.addAttribute("document", new Document());
        return "document/create";
    }

    @PostMapping("/create")
    public String create(
            @Validated @ModelAttribute Document document,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            Model model
    ) {
        if (bindingResult.hasFieldErrors()) {
            model.addAttribute("document", document);
            return "document/create";
        }
        documentService.save(document);
        redirectAttributes.addFlashAttribute("success", "Thêm mới thành công");
        return "redirect:/documents";
    }

    @RequestMapping("/{id}/edit")
    public String edit(@PathVariable Long id, Model model) {
        Document document = documentService.findById(id);
        model.addAttribute("document", document);
        return "document/edit";
    }

    @PostMapping("/{id}/update")
    public String update(
            @Validated @ModelAttribute Document document,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            Model model
    ) {
        if (bindingResult.hasFieldErrors()) {
            model.addAttribute("document", document);
            return "document/edit";
        }
        documentService.save(document);
        redirectAttributes.addFlashAttribute("success", "Cập nhật thành công");
        return "redirect:/documents";

    }

    @RequestMapping("/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        documentService.delete(id);
        redirectAttributes.addFlashAttribute("success", "Xóa thành công");
        return "redirect:/documents";
    }

    private Map<String, String> getSortOptions() {
        Map<String, String> sortOptions = new LinkedHashMap<>();
        sortOptions.put("", "Sắp xếp");
        sortOptions.put("name asc", "Tên tăng dần");
        sortOptions.put("name desc", "Tên giảm dần");
        sortOptions.put("code asc", "Mã tăng dần");
        sortOptions.put("code desc", "Mã giảm dần");
        sortOptions.put("year asc", "Năm tăng dần");
        sortOptions.put("year desc", "Năm giảm dần");
        return sortOptions;
    }

    private int[] getSizeOptions() {
        return new int[]{1, 10, 20, 50, 100};
    }

}
