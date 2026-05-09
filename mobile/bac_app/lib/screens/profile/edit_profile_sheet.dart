import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import '../../config/theme.dart';
import '../../models/profile.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/papier/papier_toast.dart';

/// Bottom-sheet form for editing display name + avatar.
///
/// Open via `EditProfileSheet.show(context, profile)` — returns `true` if
/// any field was saved (so the caller can refresh the profile).
class EditProfileSheet extends ConsumerStatefulWidget {
  final Profile profile;
  const EditProfileSheet({super.key, required this.profile});

  static Future<bool?> show(BuildContext context, Profile profile) {
    return showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Papier.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(0)),
        side: BorderSide(color: Papier.ink, width: 2),
      ),
      builder: (_) => EditProfileSheet(profile: profile),
    );
  }

  @override
  ConsumerState<EditProfileSheet> createState() => _EditProfileSheetState();
}

class _EditProfileSheetState extends ConsumerState<EditProfileSheet> {
  late final TextEditingController _nameController;
  bool _saving = false;
  bool _uploadingAvatar = false;
  String? _newAvatarUrl;
  String? _error;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.profile.displayName);
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _pickAvatar() async {
    setState(() {
      _uploadingAvatar = true;
      _error = null;
    });
    try {
      final picker = ImagePicker();
      final picked = await picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 512,
        maxHeight: 512,
        imageQuality: 80,
      );
      if (picked == null) {
        setState(() => _uploadingAvatar = false);
        return;
      }
      final bytes = await picked.readAsBytes();
      final url = await ref
          .read(authActionsProvider)
          .uploadAvatar(bytes, contentType: 'image/jpeg');
      ref.invalidate(profileProvider);
      if (mounted) {
        setState(() {
          _newAvatarUrl = url;
          _uploadingAvatar = false;
        });
        PapierToast.success(context, 'Avatar mis à jour');
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = "Échec du téléversement. Réessaie.";
          _uploadingAvatar = false;
        });
      }
    }
  }

  Future<void> _save() async {
    final newName = _nameController.text.trim();
    if (newName.isEmpty) {
      setState(() => _error = 'Le nom ne peut pas être vide.');
      return;
    }
    if (newName == widget.profile.displayName) {
      // Nothing to save
      Navigator.of(context).pop(_newAvatarUrl != null);
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      await ref.read(authActionsProvider).updateDisplayName(newName);
      ref.invalidate(profileProvider);
      if (mounted) {
        PapierToast.success(context, 'Profil mis à jour');
        Navigator.of(context).pop(true);
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = "Échec de l'enregistrement.";
          _saving = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final initial = widget.profile.displayName.isNotEmpty
        ? widget.profile.displayName[0].toUpperCase()
        : '?';
    final avatarUrl = _newAvatarUrl ?? widget.profile.avatarUrl;
    final viewInsets = MediaQuery.viewInsetsOf(context);

    return Padding(
      padding: EdgeInsets.only(bottom: viewInsets.bottom),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(22, 18, 22, 22),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Drag handle
              Center(
                child: Container(
                  width: 36,
                  height: 3,
                  color: Papier.ink3,
                ),
              ),
              const SizedBox(height: 16),
              Text('MODIFIER LE PROFIL',
                  style: PapierType.smallCaps(fontSize: 11, color: Papier.red)),
              const SizedBox(height: 8),
              Text('Profil',
                  style: PapierType.italic(
                      fontSize: 26, fontWeight: FontWeight.w500)),
              const SizedBox(height: 18),

              // Avatar tap target
              Center(
                child: GestureDetector(
                  onTap: _uploadingAvatar ? null : _pickAvatar,
                  child: Stack(
                    alignment: Alignment.bottomRight,
                    children: [
                      Container(
                        width: 96,
                        height: 96,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: Papier.ink, width: 1.5),
                          color: Papier.bg2,
                          image: avatarUrl != null
                              ? DecorationImage(
                                  image: NetworkImage(avatarUrl),
                                  fit: BoxFit.cover,
                                )
                              : null,
                        ),
                        child: avatarUrl == null
                            ? Center(
                                child: Text(
                                  initial,
                                  style: PapierType.italic(
                                    fontSize: 44,
                                    color: Papier.ink,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              )
                            : null,
                      ),
                      Container(
                        width: 28,
                        height: 28,
                        decoration: const BoxDecoration(
                          color: Papier.ink,
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: _uploadingAvatar
                              ? const SizedBox(
                                  width: 14,
                                  height: 14,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    color: Papier.surface,
                                  ),
                                )
                              : const Icon(
                                  Icons.camera_alt_outlined,
                                  size: 16,
                                  color: Papier.surface,
                                ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 22),

              // Display name field
              Text('Nom affiché',
                  style: PapierType.smallCaps(fontSize: 11, color: Papier.ink2)),
              const SizedBox(height: 8),
              TextField(
                controller: _nameController,
                maxLength: 40,
                style: PapierType.body(fontSize: 15, color: Papier.ink),
                decoration: const InputDecoration(
                  filled: true,
                  fillColor: Papier.bg,
                  contentPadding: EdgeInsets.fromLTRB(14, 14, 14, 14),
                  counterText: '',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.zero,
                    borderSide: BorderSide(color: Papier.line2),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.zero,
                    borderSide: BorderSide(color: Papier.line2),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.zero,
                    borderSide: BorderSide(color: Papier.ink, width: 1.5),
                  ),
                ),
              ),

              if (_error != null) ...[
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    border: const Border(
                      left: BorderSide(color: Papier.red, width: 2),
                    ),
                    color: Papier.red.withValues(alpha: 0.05),
                  ),
                  child: Text(
                    _error!,
                    style: PapierType.body(color: Papier.red, fontSize: 13),
                  ),
                ),
              ],

              const SizedBox(height: 22),

              // Save button
              GestureDetector(
                onTap: _saving ? null : _save,
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  color: Papier.ink,
                  child: Center(
                    child: _saving
                        ? const SizedBox(
                            width: 18,
                            height: 18,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Papier.surface,
                            ),
                          )
                        : Text(
                            'Enregistrer',
                            style: PapierType.smallCaps(
                              fontSize: 12,
                              color: Papier.surface,
                            ),
                          ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => Navigator.of(context).pop(_newAvatarUrl != null),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  child: Center(
                    child: Text(
                      'Annuler',
                      style: PapierType.italic(fontSize: 14, color: Papier.ink2),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
